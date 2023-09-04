"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWrappedDbClient = void 0;
const pg_1 = require("pg");
function createDbConnection(port = 5431) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: port,
        });
        yield client.connect((err) => {
            if (err) {
                console.error("Database connection error", err);
            }
            else {
                console.log(`Connected to database server running on port: ${port}`);
            }
        });
        return client;
    });
}
function createWrappedDbClient(port = 5431) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield createDbConnection(port);
        return {
            client,
            query: (text) => {
                console.info(text.replace(/\s+/g, " ").trim());
                return client.query(text);
            },
        };
    });
}
exports.createWrappedDbClient = createWrappedDbClient;
exports.default = createDbConnection;
//# sourceMappingURL=createDBConnection.js.map