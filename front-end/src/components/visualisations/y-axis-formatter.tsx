let scaleFormatter: (tick: any) => string;

scaleFormatter = (numb: any) => {
  return numb / 10 + "M";
};

export default scaleFormatter;
