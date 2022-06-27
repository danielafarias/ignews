import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "fake-slug",
    title: "fake-title",
    abstract: "fake-abstract",
    updatedAt: "09 de setembro de 2020",
  },
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "fake-slug",
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
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    render(<Posts posts={posts} />);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: posts,
        },
      })
    );
  });
});
