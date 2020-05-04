import { useState, useLayoutEffect } from "react";

interface Props {
  initialState: any;
  query: string;
  token: string;
}

export const useFetch = (props: Props) => {
  const [state, setState] = useState({
    data: props.initialState,
    loading: true,
  });

  useLayoutEffect(() => {
    fetch(`${process.env.GATSBY_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `bearer ${props.token}`,
      },
      body: JSON.stringify({
        query: `${props.query}`,
      }),
    })
      .then((res) => res.json())
      .then(({ errors, data }) => {
        if (errors) {
        } else {
          setState({ data: data, loading: false });
        }
      });
  }, [props.query]);

  return state;
};
