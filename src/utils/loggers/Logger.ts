import { createLogger, transports, format } from "winston";
const loggerController = createLogger({
    level: 'info',
    transports: [
        new transports.File({ filename: 'src/journals/logger.users.controller.log' }),
        new transports.File({ filename: 'src/journals/logger.users.controller-errors.log', level: 'error' }),
    ],

    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),

    defaultMeta: {
        service: "users-logged",
    },
})



export {loggerController};