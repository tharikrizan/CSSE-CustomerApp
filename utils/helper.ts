export const getDate = () => {
  let date_ = new Date().toLocaleString("default", { month: "short" });


  return `${date_}`;
};


