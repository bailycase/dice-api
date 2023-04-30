export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  DateTime: any;
  Timestamp: any;
  TimeZone: any;
  UtcOffset: any;
  Duration: any;
  ISO8601Duration: any;
  LocalDate: any;
  LocalTime: any;
  LocalEndTime: any;
  EmailAddress: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  PhoneNumber: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  URL: any;
  BigInt: any;
  Long: any;
  Byte: any;
  UUID: any;
  GUID: any;
  Hexadecimal: any;
  HexColorCode: any;
  HSL: any;
  HSLA: any;
  IP: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  JWT: any;
  Latitude: any;
  Longitude: any;
  MAC: any;
  Port: any;
  RGB: any;
  RGBA: any;
  SafeInt: any;
  USCurrency: any;
  Currency: any;
  JSON: any;
  JSONObject: any;
  IBAN: any;
  ObjectID: any;
  Void: any;
  DID: any;
  CountryCode: any;
  Locale: any;
  RoutingNumber: any;
  AccountNumber: any;
  Cuid: any;
  SemVer: any;
  DeweyDecimal: any;
  LCCSubclass: any;
  IPCPatent: any;
};

export type Query = {
  __typename?: 'Query';
  getBet?: Maybe<Bet>;
  getBetList?: Maybe<Array<Bet>>;
  getBestBetPerUser?: Maybe<Array<Bet>>;
  getUser: User;
  getUserList?: Maybe<Array<User>>;
};


export type QueryGetBetArgs = {
  id: Scalars['Int'];
};


export type QueryGetBestBetPerUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBet?: Maybe<Bet>;
};


export type MutationCreateBetArgs = {
  userId: Scalars['Int'];
  betAmount: Scalars['Float'];
  chance: Scalars['Float'];
};

export type Bet = {
  __typename?: 'Bet';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  betAmount: Scalars['Float'];
  chance: Scalars['Float'];
  payout: Scalars['Float'];
  win: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  balance: Scalars['Float'];
};
