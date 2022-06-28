import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const preview = {
  slug: "fake-slug",
  title: "fake-title",
  content: "<p>fake-abstract</p>",
  updatedAt: "09 de setembro de 2020",
};

jest.mock("../../services/prismic");
jest.mock("next-auth/react");
jest.mock("next/router");

describe("Preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Post post={preview} />);

    expect(screen.getByText("fake-title")).toBeInTheDocument();
    expect(screen.getByText("fake-abstract")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

    it("redirects if user is subscribed", async () => {
        const useSessionMocked = jest.mocked(useSession);
        const useRouterMocked = jest.mocked(useRouter);

        const pushMocked = jest.fn();
        
        useSessionMocked.mockReturnValueOnce({
            data: {
              user: {
                name: "John Doe",
                email: "john.doe@example.com",
              },
              expires: "fake-expires",
              activeSubscription: "fake-act",
            },
            status: "authenticated",
          });

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked,
          } as any);

          render(<Post post={preview} />);

          expect(pushMocked).toHaveBeenCalledWith('/posts/fake-slug');
    });

    it("loads initial data", async () => {
      const useSessionMocked = jest.mocked(useSession);

      useSessionMocked.mockReturnValueOnce({
        data: null,
        status: "unauthenticated",
      });

      const getPrismicClientMocked = jest.mocked(getPrismicClient);
     
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

      const response = await getStaticProps({
        params: {
            slug: "fake-slug",
        }
      });

      render(<Post post={preview} />);
      
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            post: preview
          }
        })
      )
    });
});
