import { AuditManager, FileSystem } from "./functional-architecture-before";

const auditManager = new AuditManager(2, "files", new FileSystem());
auditManager.addRecord("Person 1", new Date());
auditManager.addRecord("Person 2", new Date());
auditManager.addRecord("Person 3", new Date());
auditManager.addRecord("Person 4", new Date());
auditManager.addRecord("Person 5", new Date());
auditManager.addRecord("Person 6", new Date());
