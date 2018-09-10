const isDev = process.env.NODE_ENV !== "production";
const isServer = typeof window !== 'object'

export {
	isDev, isServer
}