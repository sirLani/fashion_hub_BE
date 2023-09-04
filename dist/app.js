"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
(0, server_1.default)(config_1.default).then((appSever) => {
    appSever.app.listen(3007, () => {
        console.info("Server is running on: http://localhost:3007/");
    });
});
//# sourceMappingURL=app.js.map