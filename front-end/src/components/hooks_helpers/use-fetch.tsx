import { useState, useLayoutEffect } from "react";
import axios from "axios";

interface Props {
  initialState: any;
  query: string;
}

export const useFetch = (props: Props) => {
  const [state, setState] = useState({
    data: props.initialState,
    loading: true,
  });

  useLayoutEffect(() => {
    axios({
      url: process.env.GATSBY_API_URL,
      method: "post",
      data: {
        query: props.query,
      },
    })
      .then((res: any) => res)
      .then(({ errors, data }) => {
        if (errors) {
          console.log(errors);
        } else {
          setState({ data: data.data, loading: false });
        }
      });
  }, [props.query]);

  return state;
};
