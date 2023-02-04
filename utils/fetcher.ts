/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default fetcher
