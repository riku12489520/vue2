// @props: {
//   deviceId: string,
//   min: number,
//   max: number,
//   point: number(Int)
// }
function getRandomInt(props = { min: 0, max: 1, point: 0 }) {
  const min = Math.ceil(props.min);
  const max = Math.floor(props.max);
  return (Math.random() * (max - min + 1) + min).toFixed(props.point);
}

const getTime = () => {
  const now = new Date();
  const nowFormatted =
    now.getFullYear() +
    "-" +
    (Number(now.getMonth()) + 1) +
    "-" +
    now.getDate() +
    " " +
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds();
  return nowFormatted;
};

module.exports = (props) => {
  const { deviceId, min, max, point } = props;

  return {
    state: 1,
    list: [
      {
        dev_id: deviceId,
        count: "1",
        data: [
          {
            Data: getRandomInt({ min, max, point }),
            Time: getTime()
          }
        ]
      }
    ]
  };
};
