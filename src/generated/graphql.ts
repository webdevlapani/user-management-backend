import { ModuleType } from 'types';
import { PermissionType } from 'types';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  confirmPassword_String_NotNull_minLength_6_maxLength_255: any;
  currentPassword_String_NotNull_minLength_6_maxLength_255: any;
  email_String_NotNull_maxLength_255_format_email: any;
  firstName_String_NotNull_maxLength_255_pattern_09azAZ: any;
  lastName_String_NotNull_maxLength_255_pattern_09azAZ: any;
  name_String_NotNull_maxLength_255_pattern_09azAZ: any;
  password_String_NotNull_minLength_6_maxLength_255: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};

export type ChangePasswordInput = {
  confirmPassword: Scalars['confirmPassword_String_NotNull_minLength_6_maxLength_255'];
  currentPassword: Scalars['currentPassword_String_NotNull_minLength_6_maxLength_255'];
  password: Scalars['password_String_NotNull_minLength_6_maxLength_255'];
};

export type ChangePasswordResult = Error | Success;

export type CreateRoleInput = {
  name: Scalars['name_String_NotNull_maxLength_255_pattern_09azAZ'];
  permissions: Array<PermissionsInput>;
};

export type CreateRoleResult = Error | Success;

export type DeleteRoleResult = Error | Success;

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
};

export type ForgotPasswordResult = Error | Success;

export type GetRoleResult = Error | Role;

export type GetRolesInput = {
  filters?: InputMaybe<RolesFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type GetRolesResult = Error | RolesResult;

export type GetUsersInput = {
  filters?: InputMaybe<UsersFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type GetUsersResult = Error | UsersResult;

export type LoginUserInput = {
  email: Scalars['email_String_NotNull_maxLength_255_format_email'];
  password: Scalars['password_String_NotNull_minLength_6_maxLength_255'];
};

export type LoginUserResult = Error | Tokens;

export { ModuleType };

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordResult;
  createRole: CreateRoleResult;
  deleteRole?: Maybe<DeleteRoleResult>;
  forgotPassword: ForgotPasswordResult;
  registerUser: RegisterUserResult;
  resetPassword: ResetPasswordResult;
  toggleUserStatus: ToggleUserStatusResult;
  updateRole: UpdateRoleResult;
  updateUserRole: UpdateUserRoleResult;
  uploadUserProfile: UploadUserProfileResult;
  verifyUser: Success;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationDeleteRoleArgs = {
  roleId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationToggleUserStatusArgs = {
  userId: Scalars['ID'];
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateUserRoleArgs = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUploadUserProfileArgs = {
  file: Scalars['Upload'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};

export { PermissionType };

export type Permissions = {
  __typename?: 'Permissions';
  moduleType: ModuleType;
  permissionType: Array<Maybe<PermissionType>>;
};

export type PermissionsInput = {
  moduleType: ModuleType;
  permissionType: Array<PermissionType>;
};

export type Query = {
  __typename?: 'Query';
  getRole?: Maybe<GetRoleResult>;
  getRoles: GetRolesResult;
  getUsers: GetUsersResult;
  loginUser: LoginUserResult;
  refreshUserToken: AccessToken;
  userDetails: UserDetailsResult;
};


export type QueryGetRoleArgs = {
  roleId: Scalars['ID'];
};


export type QueryGetRolesArgs = {
  getRolesInput: GetRolesInput;
};


export type QueryGetUsersArgs = {
  getUsersInput: GetUsersInput;
};


export type QueryLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type QueryRefreshUserTokenArgs = {
  refreshToken: Scalars['String'];
  userId: Scalars['ID'];
};


export type QueryUserDetailsArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};

export type RegisterUserInput = {
  email: Scalars['email_String_NotNull_maxLength_255_format_email'];
  firstName: Scalars['firstName_String_NotNull_maxLength_255_pattern_09azAZ'];
  lastName: Scalars['lastName_String_NotNull_maxLength_255_pattern_09azAZ'];
  password: Scalars['password_String_NotNull_minLength_6_maxLength_255'];
};

export type RegisterUserResult = Error | Success;

export type ResetPasswordInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResult = Error | Success;

export type Role = {
  __typename?: 'Role';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  createdBy?: Maybe<User>;
  name?: Maybe<Scalars['String']>;
  permissions: Array<Permissions>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type RolesFilterInput = {
  createdBy?: InputMaybe<Scalars['ID']>;
  moduleType?: InputMaybe<ModuleType>;
  name?: InputMaybe<Scalars['String']>;
};

export type RolesResult = {
  __typename?: 'RolesResult';
  roles?: Maybe<Array<Maybe<Role>>>;
  totalRoles?: Maybe<Scalars['Int']>;
};

export type Success = {
  __typename?: 'Success';
  success?: Maybe<Scalars['Boolean']>;
};

export type ToggleUserStatusResult = Error | Success;

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<PermissionsInput>>;
  roleId: Scalars['ID'];
};

export type UpdateRoleResult = Error | Success;

export type UpdateUserRoleResult = Error | Success;

export type UploadUserProfileResult = Error | Success;

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  profilePic?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UserDetailsResult = Error | User;

export type UserRole = {
  __typename?: 'UserRole';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  permissions: Array<Permissions>;
};

export type UsersFilterInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  totalUsers?: Maybe<Scalars['Int']>;
  users?: Maybe<Array<Maybe<User>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessToken: ResolverTypeWrapper<AccessToken>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangePasswordInput: ChangePasswordInput;
  ChangePasswordResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  CreateRoleInput: CreateRoleInput;
  CreateRoleResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteRoleResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  Error: ResolverTypeWrapper<Error>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ForgotPasswordResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  GetRoleResult: ResolversTypes['Error'] | ResolversTypes['Role'];
  GetRolesInput: GetRolesInput;
  GetRolesResult: ResolversTypes['Error'] | ResolversTypes['RolesResult'];
  GetUsersInput: GetUsersInput;
  GetUsersResult: ResolversTypes['Error'] | ResolversTypes['UsersResult'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginUserInput: LoginUserInput;
  LoginUserResult: ResolversTypes['Error'] | ResolversTypes['Tokens'];
  ModuleType: ModuleType;
  Mutation: ResolverTypeWrapper<{}>;
  PermissionType: PermissionType;
  Permissions: ResolverTypeWrapper<Permissions>;
  PermissionsInput: PermissionsInput;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  RegisterUserResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  Role: ResolverTypeWrapper<Role>;
  RolesFilterInput: RolesFilterInput;
  RolesResult: ResolverTypeWrapper<RolesResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Success: ResolverTypeWrapper<Success>;
  ToggleUserStatusResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateRoleInput: UpdateRoleInput;
  UpdateRoleResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  UpdateUserRoleResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadUserProfileResult: ResolversTypes['Error'] | ResolversTypes['Success'];
  User: ResolverTypeWrapper<User>;
  UserDetailsResult: ResolversTypes['Error'] | ResolversTypes['User'];
  UserRole: ResolverTypeWrapper<UserRole>;
  UsersFilterInput: UsersFilterInput;
  UsersResult: ResolverTypeWrapper<UsersResult>;
  confirmPassword_String_NotNull_minLength_6_maxLength_255: ResolverTypeWrapper<Scalars['confirmPassword_String_NotNull_minLength_6_maxLength_255']>;
  currentPassword_String_NotNull_minLength_6_maxLength_255: ResolverTypeWrapper<Scalars['currentPassword_String_NotNull_minLength_6_maxLength_255']>;
  email_String_NotNull_maxLength_255_format_email: ResolverTypeWrapper<Scalars['email_String_NotNull_maxLength_255_format_email']>;
  firstName_String_NotNull_maxLength_255_pattern_09azAZ: ResolverTypeWrapper<Scalars['firstName_String_NotNull_maxLength_255_pattern_09azAZ']>;
  lastName_String_NotNull_maxLength_255_pattern_09azAZ: ResolverTypeWrapper<Scalars['lastName_String_NotNull_maxLength_255_pattern_09azAZ']>;
  name_String_NotNull_maxLength_255_pattern_09azAZ: ResolverTypeWrapper<Scalars['name_String_NotNull_maxLength_255_pattern_09azAZ']>;
  password_String_NotNull_minLength_6_maxLength_255: ResolverTypeWrapper<Scalars['password_String_NotNull_minLength_6_maxLength_255']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessToken: AccessToken;
  Boolean: Scalars['Boolean'];
  ChangePasswordInput: ChangePasswordInput;
  ChangePasswordResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  CreateRoleInput: CreateRoleInput;
  CreateRoleResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  Date: Scalars['Date'];
  DeleteRoleResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  Error: Error;
  Float: Scalars['Float'];
  ForgotPasswordResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  GetRoleResult: ResolversParentTypes['Error'] | ResolversParentTypes['Role'];
  GetRolesInput: GetRolesInput;
  GetRolesResult: ResolversParentTypes['Error'] | ResolversParentTypes['RolesResult'];
  GetUsersInput: GetUsersInput;
  GetUsersResult: ResolversParentTypes['Error'] | ResolversParentTypes['UsersResult'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginUserInput: LoginUserInput;
  LoginUserResult: ResolversParentTypes['Error'] | ResolversParentTypes['Tokens'];
  Mutation: {};
  Permissions: Permissions;
  PermissionsInput: PermissionsInput;
  Query: {};
  RegisterUserInput: RegisterUserInput;
  RegisterUserResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  Role: Role;
  RolesFilterInput: RolesFilterInput;
  RolesResult: RolesResult;
  String: Scalars['String'];
  Success: Success;
  ToggleUserStatusResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  Tokens: Tokens;
  UpdateRoleInput: UpdateRoleInput;
  UpdateRoleResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  UpdateUserRoleResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  Upload: Scalars['Upload'];
  UploadUserProfileResult: ResolversParentTypes['Error'] | ResolversParentTypes['Success'];
  User: User;
  UserDetailsResult: ResolversParentTypes['Error'] | ResolversParentTypes['User'];
  UserRole: UserRole;
  UsersFilterInput: UsersFilterInput;
  UsersResult: UsersResult;
  confirmPassword_String_NotNull_minLength_6_maxLength_255: Scalars['confirmPassword_String_NotNull_minLength_6_maxLength_255'];
  currentPassword_String_NotNull_minLength_6_maxLength_255: Scalars['currentPassword_String_NotNull_minLength_6_maxLength_255'];
  email_String_NotNull_maxLength_255_format_email: Scalars['email_String_NotNull_maxLength_255_format_email'];
  firstName_String_NotNull_maxLength_255_pattern_09azAZ: Scalars['firstName_String_NotNull_maxLength_255_pattern_09azAZ'];
  lastName_String_NotNull_maxLength_255_pattern_09azAZ: Scalars['lastName_String_NotNull_maxLength_255_pattern_09azAZ'];
  name_String_NotNull_maxLength_255_pattern_09azAZ: Scalars['name_String_NotNull_maxLength_255_pattern_09azAZ'];
  password_String_NotNull_minLength_6_maxLength_255: Scalars['password_String_NotNull_minLength_6_maxLength_255'];
};

export type ConstraintDirectiveArgs = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  exclusiveMax?: Maybe<Scalars['Float']>;
  exclusiveMin?: Maybe<Scalars['Float']>;
  format?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Float']>;
  maxLength?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Float']>;
  minLength?: Maybe<Scalars['Int']>;
  multipleOf?: Maybe<Scalars['Float']>;
  notContains?: Maybe<Scalars['String']>;
  pattern?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  uniqueTypeName?: Maybe<Scalars['String']>;
};

export type ConstraintDirectiveResolver<Result, Parent, ContextType = Context, Args = ConstraintDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccessTokenResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangePasswordResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChangePasswordResult'] = ResolversParentTypes['ChangePasswordResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type CreateRoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateRoleResult'] = ResolversParentTypes['CreateRoleResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteRoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteRoleResult'] = ResolversParentTypes['DeleteRoleResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ForgotPasswordResult'] = ResolversParentTypes['ForgotPasswordResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type GetRoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetRoleResult'] = ResolversParentTypes['GetRoleResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Role', ParentType, ContextType>;
};

export type GetRolesResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetRolesResult'] = ResolversParentTypes['GetRolesResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'RolesResult', ParentType, ContextType>;
};

export type GetUsersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUsersResult'] = ResolversParentTypes['GetUsersResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'UsersResult', ParentType, ContextType>;
};

export type LoginUserResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginUserResult'] = ResolversParentTypes['LoginUserResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Tokens', ParentType, ContextType>;
};

export type ModuleTypeResolvers = EnumResolverSignature<{ ROLES?: any, USERS?: any }, ResolversTypes['ModuleType']>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePassword?: Resolver<ResolversTypes['ChangePasswordResult'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'changePasswordInput'>>;
  createRole?: Resolver<ResolversTypes['CreateRoleResult'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'createRoleInput'>>;
  deleteRole?: Resolver<Maybe<ResolversTypes['DeleteRoleResult']>, ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, 'roleId'>>;
  forgotPassword?: Resolver<ResolversTypes['ForgotPasswordResult'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  registerUser?: Resolver<ResolversTypes['RegisterUserResult'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'registerUserInput'>>;
  resetPassword?: Resolver<ResolversTypes['ResetPasswordResult'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'resetPasswordInput'>>;
  toggleUserStatus?: Resolver<ResolversTypes['ToggleUserStatusResult'], ParentType, ContextType, RequireFields<MutationToggleUserStatusArgs, 'userId'>>;
  updateRole?: Resolver<ResolversTypes['UpdateRoleResult'], ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, 'updateRoleInput'>>;
  updateUserRole?: Resolver<ResolversTypes['UpdateUserRoleResult'], ParentType, ContextType, RequireFields<MutationUpdateUserRoleArgs, 'roleId' | 'userId'>>;
  uploadUserProfile?: Resolver<ResolversTypes['UploadUserProfileResult'], ParentType, ContextType, RequireFields<MutationUploadUserProfileArgs, 'file'>>;
  verifyUser?: Resolver<ResolversTypes['Success'], ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
};

export type PermissionTypeResolvers = EnumResolverSignature<{ CREATE?: any, DELETE?: any, READ?: any, UPDATE?: any }, ResolversTypes['PermissionType']>;

export type PermissionsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Permissions'] = ResolversParentTypes['Permissions']> = {
  moduleType?: Resolver<ResolversTypes['ModuleType'], ParentType, ContextType>;
  permissionType?: Resolver<Array<Maybe<ResolversTypes['PermissionType']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRole?: Resolver<Maybe<ResolversTypes['GetRoleResult']>, ParentType, ContextType, RequireFields<QueryGetRoleArgs, 'roleId'>>;
  getRoles?: Resolver<ResolversTypes['GetRolesResult'], ParentType, ContextType, RequireFields<QueryGetRolesArgs, 'getRolesInput'>>;
  getUsers?: Resolver<ResolversTypes['GetUsersResult'], ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'getUsersInput'>>;
  loginUser?: Resolver<ResolversTypes['LoginUserResult'], ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'loginUserInput'>>;
  refreshUserToken?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<QueryRefreshUserTokenArgs, 'refreshToken' | 'userId'>>;
  userDetails?: Resolver<ResolversTypes['UserDetailsResult'], ParentType, ContextType, Partial<QueryUserDetailsArgs>>;
};

export type RegisterUserResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterUserResult'] = ResolversParentTypes['RegisterUserResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type ResetPasswordResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResetPasswordResult'] = ResolversParentTypes['ResetPasswordResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type RoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permissions']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RolesResult'] = ResolversParentTypes['RolesResult']> = {
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  totalRoles?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ToggleUserStatusResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ToggleUserStatusResult'] = ResolversParentTypes['ToggleUserStatusResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type TokensResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateRoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateRoleResult'] = ResolversParentTypes['UpdateRoleResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type UpdateUserRoleResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UpdateUserRoleResult'] = ResolversParentTypes['UpdateUserRoleResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadUserProfileResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadUserProfileResult'] = ResolversParentTypes['UploadUserProfileResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'Success', ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profilePic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRole']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDetailsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserDetailsResult'] = ResolversParentTypes['UserDetailsResult']> = {
  __resolveType: TypeResolveFn<'Error' | 'User', ParentType, ContextType>;
};

export type UserRoleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserRole'] = ResolversParentTypes['UserRole']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['Permissions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = {
  totalUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface ConfirmPassword_String_NotNull_MinLength_6_MaxLength_255ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['confirmPassword_String_NotNull_minLength_6_maxLength_255'], any> {
  name: 'confirmPassword_String_NotNull_minLength_6_maxLength_255';
}

export interface CurrentPassword_String_NotNull_MinLength_6_MaxLength_255ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['currentPassword_String_NotNull_minLength_6_maxLength_255'], any> {
  name: 'currentPassword_String_NotNull_minLength_6_maxLength_255';
}

export interface Email_String_NotNull_MaxLength_255_Format_EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['email_String_NotNull_maxLength_255_format_email'], any> {
  name: 'email_String_NotNull_maxLength_255_format_email';
}

export interface FirstName_String_NotNull_MaxLength_255_Pattern_09azAzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['firstName_String_NotNull_maxLength_255_pattern_09azAZ'], any> {
  name: 'firstName_String_NotNull_maxLength_255_pattern_09azAZ';
}

export interface LastName_String_NotNull_MaxLength_255_Pattern_09azAzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['lastName_String_NotNull_maxLength_255_pattern_09azAZ'], any> {
  name: 'lastName_String_NotNull_maxLength_255_pattern_09azAZ';
}

export interface Name_String_NotNull_MaxLength_255_Pattern_09azAzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['name_String_NotNull_maxLength_255_pattern_09azAZ'], any> {
  name: 'name_String_NotNull_maxLength_255_pattern_09azAZ';
}

export interface Password_String_NotNull_MinLength_6_MaxLength_255ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['password_String_NotNull_minLength_6_maxLength_255'], any> {
  name: 'password_String_NotNull_minLength_6_maxLength_255';
}

export type Resolvers<ContextType = Context> = {
  AccessToken?: AccessTokenResolvers<ContextType>;
  ChangePasswordResult?: ChangePasswordResultResolvers<ContextType>;
  CreateRoleResult?: CreateRoleResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteRoleResult?: DeleteRoleResultResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  ForgotPasswordResult?: ForgotPasswordResultResolvers<ContextType>;
  GetRoleResult?: GetRoleResultResolvers<ContextType>;
  GetRolesResult?: GetRolesResultResolvers<ContextType>;
  GetUsersResult?: GetUsersResultResolvers<ContextType>;
  LoginUserResult?: LoginUserResultResolvers<ContextType>;
  ModuleType?: ModuleTypeResolvers;
  Mutation?: MutationResolvers<ContextType>;
  PermissionType?: PermissionTypeResolvers;
  Permissions?: PermissionsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserResult?: RegisterUserResultResolvers<ContextType>;
  ResetPasswordResult?: ResetPasswordResultResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolesResult?: RolesResultResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  ToggleUserStatusResult?: ToggleUserStatusResultResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UpdateRoleResult?: UpdateRoleResultResolvers<ContextType>;
  UpdateUserRoleResult?: UpdateUserRoleResultResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UploadUserProfileResult?: UploadUserProfileResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserDetailsResult?: UserDetailsResultResolvers<ContextType>;
  UserRole?: UserRoleResolvers<ContextType>;
  UsersResult?: UsersResultResolvers<ContextType>;
  confirmPassword_String_NotNull_minLength_6_maxLength_255?: GraphQLScalarType;
  currentPassword_String_NotNull_minLength_6_maxLength_255?: GraphQLScalarType;
  email_String_NotNull_maxLength_255_format_email?: GraphQLScalarType;
  firstName_String_NotNull_maxLength_255_pattern_09azAZ?: GraphQLScalarType;
  lastName_String_NotNull_maxLength_255_pattern_09azAZ?: GraphQLScalarType;
  name_String_NotNull_maxLength_255_pattern_09azAZ?: GraphQLScalarType;
  password_String_NotNull_minLength_6_maxLength_255?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = Context> = {
  constraint?: ConstraintDirectiveResolver<any, any, ContextType>;
};
