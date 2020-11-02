import axios from 'axios';
import DataLoader from 'dataloader';

export const incomeBills = {
  Query: {
    incomeBills: (_, __, context) => {
      const loaderIncomeBills = async (keys) =>
        await Promise.all(keys.map(() =>
          axios.get('http://localhost:9080/data/income')
            .then((res) => res.data)
            .catch((e) => {throw Error(e.response.statusText); })
        ));

      let loader = context.loaderIncomeBills;
      if (!loader) {
        context.loaderIncomeBills = loader = new DataLoader((key) => loaderIncomeBills(key));
      }
      return loader.load([]);
    },
  },
};