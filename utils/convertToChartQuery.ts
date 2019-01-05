export default (prevQueryParams: any) => {
  // const isServer = typeof window === "undefined";
  let parsedPrevQueryParams = null;
  // if (!isServer) {
  //   parsedPrevQueryParams = JSON.parse(prevQueryParams);
  // } else {
  parsedPrevQueryParams = prevQueryParams;
  // }
  let newQueryParams = {
    ...parsedPrevQueryParams,
    selectedPl: [prevQueryParams.selectedPl],
    selectedPd: [parsedPrevQueryParams.selectedPd],
    selectedTy: [parsedPrevQueryParams.selectedTy],
    initialSF:
      typeof parsedPrevQueryParams.initialSF === "string"
        ? parsedPrevQueryParams.initialSF
        : parsedPrevQueryParams.initialSF.toISOString(),
    initialST:
      typeof parsedPrevQueryParams.initialST === "string"
        ? parsedPrevQueryParams.initialST
        : parsedPrevQueryParams.initialST.toISOString()
  };
  return newQueryParams;
};
