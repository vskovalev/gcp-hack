var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var dotenv = require("dotenv");
var PineconeClient = require("@pinecone-database/pinecone").PineconeClient;
var langDoc = require("langchain/document");
var OpenAIEmbeddings = require("langchain/embeddings/openai").OpenAIEmbeddings;
var PineconeStore = require("langchain/vectorstores/pinecone").PineconeStore;
var PDFLoader = require("langchain/document_loaders/fs/pdf").PDFLoader;
var CharacterTextSplitter = require("langchain/text_splitter").CharacterTextSplitter;
dotenv.config();
/**
 * To execute, run: `ts-node scripts/createIndex.ts`
 *
 * Script for creating a new Pinecone index and uploading documents to it. A few things to keep in mind:
 * 1) You need to have a Pinecone account and have created an index and provide pinecone credentials
 * 2) install `npm install -g ts-node` globally so you can run this script
 * 3) I had to install `npm install pdf-parse` globally to get this to work
 * 4) langchain is an evolving library. You can look at the docs for latest changes: https://js.langchain.com/docs/
 *
 */
(function () { return __awaiter(_this, void 0, void 0, function () {
    var client, pineconeIndex, loader, docs, splitter, splitDocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new PineconeClient();
                return [4 /*yield*/, client.init({
                        apiKey: process.env.PINECONE_API_KEY,
                        environment: process.env.PINECONE_ENVIRONMENT,
                    })];
            case 1:
                _a.sent();
                pineconeIndex = client.Index(process.env.PINECONE_INDEX);
                loader = new PDFLoader("./src/app/scripts/navalPdf.pdf", {
                    splitPages: false,
                });
                return [4 /*yield*/, loader.load()];
            case 2:
                docs = _a.sent();
                splitter = new CharacterTextSplitter({
                    separator: "\n",
                    chunkSize: 2000,
                    chunkOverlap: 200,
                });
                return [4 /*yield*/, splitter.splitDocuments(docs)];
            case 3:
                splitDocs = _a.sent();
                // uploading chunks to pinecone
                return [4 /*yield*/, PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
                        pineconeIndex: pineconeIndex,
                    })];
            case 4:
                // uploading chunks to pinecone
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
