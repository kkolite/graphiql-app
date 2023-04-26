export const PATTERN = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g,
  USERNAME: /^[A-Za-z0-9_]{2,13}$/g,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
}
