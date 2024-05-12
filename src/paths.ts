const paths = {
  home() {
    return "/";
  },
  positionsShow() {
    return "/positions";
  },

  positionsCreate() {
    return "/positions/new";
  },

  positionShow(positionId: string) {
    return `/positions/${positionId}`;
  },
  createIndustry() {
    return `/createIndustry`;
  },
};

export default paths;
