export const typeDefs = ["type Mutation {\n  saveMyClients(name: String!, remark: String): Client\n  updateMyClients(clientId: Int!, name: String, remark: String): Client\n  addRateReader(userId: Int!): User!\n  removeRateReader(userId: Int!): User!\n  setRate(rateId: Int, newRate: String, handler: String!): [Rate]\n  signup(email: String!, password: String!, nickname: String!): LoginResponse\n  login(email: String!, password: String!): LoginResponse\n  updateProfile(company: String, image: String, job_boolean: String, profile_name: String): UserResponse!\n  updateProfileImage(file: Upload!): UserResponse!\n}\n\ntype Query {\n  getMyClients(search: String): [Client]!\n  getReaders: [User]!\n  getShowers: [User]!\n  getRates(before: String, last: Int, after: String, first: Int, queryParams: String): RateResponse\n  getInputpersons(search: String): [User]\n  getClients(search: String): [Client]\n  getLiners(search: String, showOurs: Boolean): [Liner]\n  getLocations(search: String, showOurs: Boolean, polOrPod: String): [Location]\n  getCNTRtypes(search: String, showOurs: Boolean): [CNTRtype]\n  me: UserResponse\n  findUsers(email: String, nickname: String, profile_name: String, company: String): [User]\n  checkIfExist(email: String!): Boolean!\n}\n\ntype RateResponse {\n  ok: Boolean\n  data: Rate_rateConnection\n  error: String\n}\n\ntype Rate_rateConnection {\n  pageInfo: PageInfo\n  edges: [Rate_rateEdge]\n}\n\ntype PageInfo {\n  hasNextPage: Boolean\n  hasPreviousPage: Boolean\n  startCursor: String\n  endCursor: String\n}\n\ntype Rate_rateEdge {\n  node: Rate\n  cursor: String\n}\n\ntype Rate {\n  id: Int!\n  inputperson: User!\n  client: Client!\n  liner: Liner!\n  pol: Location!\n  pod: Location!\n  cntrtype: CNTRtype!\n  buying20: Int\n  buying40: Int\n  buying4H: Int\n  selling20: Int\n  selling40: Int\n  selling4H: Int\n  loadingFT: Int\n  dischargingFT: Int\n  offeredDate: String\n  effectiveDate: String\n  recordedDate: String\n  remark: String\n  deleted: Boolean\n}\n\ntype Client {\n  id: Int!\n  name: String!\n  salesman: User!\n  remarks: String!\n  recordedDate: String\n}\n\ntype Liner {\n  id: Int!\n  name: String!\n  label: String!\n}\n\ntype Location {\n  id: Int!\n  name: String!\n  country: String!\n  label: String!\n}\n\ntype CNTRtype {\n  id: Int!\n  name: String!\n}\n\ntype LoginResponse {\n  ok: Boolean\n  data: TokenResponse\n  error: String\n}\n\ntype TokenResponse {\n  token: String\n  user: User\n}\n\nscalar Upload\n\ntype User {\n  id: Int!\n  email: String!\n  nickname: String!\n  password: String!\n  profile: UserProfile!\n}\n\ntype UserProfile {\n  id: Int!\n  owner: User!\n  profile_name: String!\n  company: String\n  job_boolean: String\n  image: String\n}\n\ntype UserResponse {\n  ok: Boolean\n  data: User\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  getMyClients: Array<Client>;
  getReaders: Array<User>;
  getShowers: Array<User>;
  getRates: RateResponse | null;
  getInputpersons: Array<User> | null;
  getClients: Array<Client> | null;
  getLiners: Array<Liner> | null;
  getLocations: Array<Location> | null;
  getCNTRtypes: Array<CNTRtype> | null;
  me: UserResponse | null;
  findUsers: Array<User> | null;
  checkIfExist: boolean;
}

export interface GetMyClientsQueryArgs {
  search: string | null;
}

export interface GetRatesQueryArgs {
  before: string | null;
  last: number | null;
  after: string | null;
  first: number | null;
  queryParams: string | null;
}

export interface GetInputpersonsQueryArgs {
  search: string | null;
}

export interface GetClientsQueryArgs {
  search: string | null;
}

export interface GetLinersQueryArgs {
  search: string | null;
  showOurs: boolean | null;
}

export interface GetLocationsQueryArgs {
  search: string | null;
  showOurs: boolean | null;
  polOrPod: string | null;
}

export interface GetCntRtypesQueryArgs {
  search: string | null;
  showOurs: boolean | null;
}

export interface FindUsersQueryArgs {
  email: string | null;
  nickname: string | null;
  profile_name: string | null;
  company: string | null;
}

export interface CheckIfExistQueryArgs {
  email: string;
}

export interface Client {
  id: number;
  name: string;
  salesman: User;
  remarks: string;
  recordedDate: string | null;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  owner: User;
  profile_name: string;
  company: string | null;
  job_boolean: string | null;
  image: string | null;
}

export interface RateResponse {
  ok: boolean | null;
  data: Rate_rateConnection | null;
  error: string | null;
}

export interface Rate_rateConnection {
  pageInfo: PageInfo | null;
  edges: Array<Rate_rateEdge> | null;
}

export interface PageInfo {
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Rate_rateEdge {
  node: Rate | null;
  cursor: string | null;
}

export interface Rate {
  id: number;
  inputperson: User;
  client: Client;
  liner: Liner;
  pol: Location;
  pod: Location;
  cntrtype: CNTRtype;
  buying20: number | null;
  buying40: number | null;
  buying4H: number | null;
  selling20: number | null;
  selling40: number | null;
  selling4H: number | null;
  loadingFT: number | null;
  dischargingFT: number | null;
  offeredDate: string | null;
  effectiveDate: string | null;
  recordedDate: string | null;
  remark: string | null;
  deleted: boolean | null;
}

export interface Liner {
  id: number;
  name: string;
  label: string;
}

export interface Location {
  id: number;
  name: string;
  country: string;
  label: string;
}

export interface CNTRtype {
  id: number;
  name: string;
}

export interface UserResponse {
  ok: boolean | null;
  data: User | null;
  error: string | null;
}

export interface Mutation {
  saveMyClients: Client | null;
  updateMyClients: Client | null;
  addRateReader: User;
  removeRateReader: User;
  setRate: Array<Rate> | null;
  signup: LoginResponse | null;
  login: LoginResponse | null;
  updateProfile: UserResponse;
  updateProfileImage: UserResponse;
}

export interface SaveMyClientsMutationArgs {
  name: string;
  remark: string | null;
}

export interface UpdateMyClientsMutationArgs {
  clientId: number;
  name: string | null;
  remark: string | null;
}

export interface AddRateReaderMutationArgs {
  userId: number;
}

export interface RemoveRateReaderMutationArgs {
  userId: number;
}

export interface SetRateMutationArgs {
  rateId: number | null;
  newRate: string | null;
  handler: string;
}

export interface SignupMutationArgs {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginMutationArgs {
  email: string;
  password: string;
}

export interface UpdateProfileMutationArgs {
  company: string | null;
  image: string | null;
  job_boolean: string | null;
  profile_name: string | null;
}

export interface UpdateProfileImageMutationArgs {
  file: Upload;
}

export interface LoginResponse {
  ok: boolean | null;
  data: TokenResponse | null;
  error: string | null;
}

export interface TokenResponse {
  token: string | null;
  user: User | null;
}

export type Upload = any;
