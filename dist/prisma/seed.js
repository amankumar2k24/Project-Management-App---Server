"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelNames = orderedFileNames.map((fileName) => {
            const modelName = path.basename(fileName, path.extname(fileName));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        for (const modelName of modelNames) {
            const model = prisma[modelName];
            try {
                yield model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            }
            catch (error) {
                console.error(`Error clearing data from ${modelName}:`, error);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path.join(__dirname, "seedData");
        const orderedFileNames = [
            "team.json",
            "project.json",
            "projectTeam.json",
            "user.json",
            "task.json",
            "attachment.json",
            "comment.json",
            "taskAssignment.json",
        ];
        yield deleteAllData(orderedFileNames);
        for (const fileName of orderedFileNames) {
            const filePath = path.join(dataDirectory, fileName);
            const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            const modelName = path.basename(fileName, path.extname(fileName));
            const model = prisma[modelName];
            try {
                for (const data of jsonData) {
                    yield model.create({ data });
                }
                console.log(`Seeded ${modelName} with data from ${fileName}`);
            }
            catch (error) {
                console.error(`Error seeding data for ${modelName}:`, error);
            }
        }
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
