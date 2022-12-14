import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, admin, truck, (list)|(create)|(edit)|(delete)
p, admin, stop, (list)|(create)|(edit)|(delete)
p, admin, package, (list)|(create)|(edit)|(delete)
p, admin, trip, (list)|(create)|(edit)|(delete)

p, driver, stop, (list)|(create)
p, driver, trip, list

p, manager, truck, (list)|(create)
p, manager, stop, (list)|(create)
p, manager, package, (list)|(create)
p, manager, trip, (list)|(create)
`);
