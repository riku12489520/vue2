const mockingData = require("./mockingData");

module.exports = [
  {
    pcmId: 1,
    deviceId: "dev_1011",
    value: () => {
      return mockingData({
        deviceId: "dev_1011",
        min: 0,
        max: 1,
        point: 0
      });
    }
  },
  {
    pcmId: 1,
    deviceId: "dev_1012",
    value: () => {
      return mockingData({
        deviceId: "dev_1012",
        min: -50,
        max: 5,
        point: 0
      });
    }
  },
  {
    pcmId: 1,
    deviceId: "dev_1013",
    value: () => {
      return mockingData({
        deviceId: "dev_1013",
        min: 0.01,
        max: 100.99,
        point: 2
      });
    }
  },
  {
    pcmId: 1,
    deviceId: "dev_1021",
    value: () => {
      return mockingData({
        deviceId: "dev_1021",
        min: 0,
        max: 1,
        point: 0
      });
    }
  },
  {
    pcmId: 1,
    deviceId: "dev_1022",
    value: () => {
      return mockingData({
        deviceId: "dev_1022",
        min: -50,
        max: 5,
        point: 0
      });
    }
  },
  {
    pcmId: 1,
    deviceId: "dev_1023",
    value: () => {
      return mockingData({
        deviceId: "dev_1023",
        min: 0.01,
        max: 100.99,
        point: 2
      });
    }
  },

  {
    pcmId: 2,
    deviceId: "dev_2011",
    value: () => {
      return mockingData({
        deviceId: "dev_2011",
        min: 0,
        max: 1,
        point: 0
      });
    }
  },

  {
    pcmId: 3,
    deviceId: "dev_3011",
    value: () => {
      return mockingData({
        deviceId: "dev_3011",
        min: 0,
        max: 100,
        point: 0
      });
    }
  },
  {
    pcmId: 3,
    deviceId: "dev_3021",
    value: () => {
      return mockingData({
        deviceId: "dev_3021",
        min: 0,
        max: 100,
        point: 0
      });
    }
  }
];
