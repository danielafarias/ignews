import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "fake-slug",
  title: "fake-title",
  content: "fake-content",
  updatedAt: "09 de setembro de 2020",
};

jest.mock("../../services/prismic");
jest.mock("next-auth/react");

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-content")).toBeInTheDocument();
  });

  it("redirects if user is not subscribed", async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    } as any);

    render(<Post post={post} />);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/posts/preview/fake-slug",
        }),
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = jest.mocked(getSession);
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake",
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: "heading",
              text: "fake-title",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "fake-abstract",
            },
          ],
        },
        last_publication_date: "09-09-2020",
      }),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    } as any);

    render(<Post post={post} />);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: post,
        },
      })
    );
  });
});
