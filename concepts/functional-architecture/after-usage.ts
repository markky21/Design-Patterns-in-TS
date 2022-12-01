import {
  ApplicationService,
  AuditManager,
  Persister,
  FileSystem,
} from "./functional-architecture-after";

const applicationService = new ApplicationService(
  "files",
  new AuditManager(2),
  new Persister(new FileSystem())
);
applicationService.addRecord("Person 1", new Date());
applicationService.addRecord("Person 2", new Date());
applicationService.addRecord("Person 3", new Date());
applicationService.addRecord("Person 4", new Date());
applicationService.addRecord("Person 5", new Date());
applicationService.addRecord("Person 6", new Date());
