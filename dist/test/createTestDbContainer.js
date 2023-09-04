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
const testcontainers_1 = require("testcontainers");
function createTestDbContainer() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new testcontainers_1.GenericContainer("postgres")
            .withEnvironment({ DB_USER: "postgres" })
            .withEnvironment({ DB_PASSWORD: "uniquepassword" })
            .withEnvironment({ DB_NAME: "fashion_hub" })
            .withExposedPorts(5431)
            .start();
    });
}
exports.default = createTestDbContainer;
//# sourceMappingURL=createTestDbContainer.js.map