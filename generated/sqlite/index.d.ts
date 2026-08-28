
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Produto
 * 
 */
export type Produto = $Result.DefaultSelection<Prisma.$ProdutoPayload>
/**
 * Model Lote
 * 
 */
export type Lote = $Result.DefaultSelection<Prisma.$LotePayload>
/**
 * Model Aparelho
 * 
 */
export type Aparelho = $Result.DefaultSelection<Prisma.$AparelhoPayload>
/**
 * Model Venda
 * 
 */
export type Venda = $Result.DefaultSelection<Prisma.$VendaPayload>
/**
 * Model VendaItem
 * 
 */
export type VendaItem = $Result.DefaultSelection<Prisma.$VendaItemPayload>
/**
 * Model Pagamento
 * 
 */
export type Pagamento = $Result.DefaultSelection<Prisma.$PagamentoPayload>
/**
 * Model Garantia
 * 
 */
export type Garantia = $Result.DefaultSelection<Prisma.$GarantiaPayload>
/**
 * Model Assistencia
 * 
 */
export type Assistencia = $Result.DefaultSelection<Prisma.$AssistenciaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  FUNCIONARIO: 'FUNCIONARIO'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produto`: Exposes CRUD operations for the **Produto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Produtos
    * const produtos = await prisma.produto.findMany()
    * ```
    */
  get produto(): Prisma.ProdutoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lote`: Exposes CRUD operations for the **Lote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lotes
    * const lotes = await prisma.lote.findMany()
    * ```
    */
  get lote(): Prisma.LoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aparelho`: Exposes CRUD operations for the **Aparelho** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aparelhos
    * const aparelhos = await prisma.aparelho.findMany()
    * ```
    */
  get aparelho(): Prisma.AparelhoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venda`: Exposes CRUD operations for the **Venda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendas
    * const vendas = await prisma.venda.findMany()
    * ```
    */
  get venda(): Prisma.VendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vendaItem`: Exposes CRUD operations for the **VendaItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendaItems
    * const vendaItems = await prisma.vendaItem.findMany()
    * ```
    */
  get vendaItem(): Prisma.VendaItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pagamento`: Exposes CRUD operations for the **Pagamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagamentos
    * const pagamentos = await prisma.pagamento.findMany()
    * ```
    */
  get pagamento(): Prisma.PagamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.garantia`: Exposes CRUD operations for the **Garantia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Garantias
    * const garantias = await prisma.garantia.findMany()
    * ```
    */
  get garantia(): Prisma.GarantiaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assistencia`: Exposes CRUD operations for the **Assistencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assistencias
    * const assistencias = await prisma.assistencia.findMany()
    * ```
    */
  get assistencia(): Prisma.AssistenciaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Produto: 'Produto',
    Lote: 'Lote',
    Aparelho: 'Aparelho',
    Venda: 'Venda',
    VendaItem: 'VendaItem',
    Pagamento: 'Pagamento',
    Garantia: 'Garantia',
    Assistencia: 'Assistencia'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "produto" | "lote" | "aparelho" | "venda" | "vendaItem" | "pagamento" | "garantia" | "assistencia"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Produto: {
        payload: Prisma.$ProdutoPayload<ExtArgs>
        fields: Prisma.ProdutoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProdutoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProdutoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findFirst: {
            args: Prisma.ProdutoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProdutoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          findMany: {
            args: Prisma.ProdutoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          create: {
            args: Prisma.ProdutoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          createMany: {
            args: Prisma.ProdutoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProdutoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          delete: {
            args: Prisma.ProdutoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          update: {
            args: Prisma.ProdutoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          deleteMany: {
            args: Prisma.ProdutoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProdutoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProdutoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>[]
          }
          upsert: {
            args: Prisma.ProdutoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProdutoPayload>
          }
          aggregate: {
            args: Prisma.ProdutoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduto>
          }
          groupBy: {
            args: Prisma.ProdutoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProdutoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProdutoCountArgs<ExtArgs>
            result: $Utils.Optional<ProdutoCountAggregateOutputType> | number
          }
        }
      }
      Lote: {
        payload: Prisma.$LotePayload<ExtArgs>
        fields: Prisma.LoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findFirst: {
            args: Prisma.LoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          findMany: {
            args: Prisma.LoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          create: {
            args: Prisma.LoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          createMany: {
            args: Prisma.LoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          delete: {
            args: Prisma.LoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          update: {
            args: Prisma.LoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          deleteMany: {
            args: Prisma.LoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>[]
          }
          upsert: {
            args: Prisma.LoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LotePayload>
          }
          aggregate: {
            args: Prisma.LoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLote>
          }
          groupBy: {
            args: Prisma.LoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoteCountArgs<ExtArgs>
            result: $Utils.Optional<LoteCountAggregateOutputType> | number
          }
        }
      }
      Aparelho: {
        payload: Prisma.$AparelhoPayload<ExtArgs>
        fields: Prisma.AparelhoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AparelhoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AparelhoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          findFirst: {
            args: Prisma.AparelhoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AparelhoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          findMany: {
            args: Prisma.AparelhoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>[]
          }
          create: {
            args: Prisma.AparelhoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          createMany: {
            args: Prisma.AparelhoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AparelhoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>[]
          }
          delete: {
            args: Prisma.AparelhoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          update: {
            args: Prisma.AparelhoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          deleteMany: {
            args: Prisma.AparelhoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AparelhoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AparelhoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>[]
          }
          upsert: {
            args: Prisma.AparelhoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AparelhoPayload>
          }
          aggregate: {
            args: Prisma.AparelhoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAparelho>
          }
          groupBy: {
            args: Prisma.AparelhoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AparelhoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AparelhoCountArgs<ExtArgs>
            result: $Utils.Optional<AparelhoCountAggregateOutputType> | number
          }
        }
      }
      Venda: {
        payload: Prisma.$VendaPayload<ExtArgs>
        fields: Prisma.VendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          findFirst: {
            args: Prisma.VendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          findMany: {
            args: Prisma.VendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>[]
          }
          create: {
            args: Prisma.VendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          createMany: {
            args: Prisma.VendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>[]
          }
          delete: {
            args: Prisma.VendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          update: {
            args: Prisma.VendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          deleteMany: {
            args: Prisma.VendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>[]
          }
          upsert: {
            args: Prisma.VendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaPayload>
          }
          aggregate: {
            args: Prisma.VendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenda>
          }
          groupBy: {
            args: Prisma.VendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendaCountArgs<ExtArgs>
            result: $Utils.Optional<VendaCountAggregateOutputType> | number
          }
        }
      }
      VendaItem: {
        payload: Prisma.$VendaItemPayload<ExtArgs>
        fields: Prisma.VendaItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendaItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendaItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          findFirst: {
            args: Prisma.VendaItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendaItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          findMany: {
            args: Prisma.VendaItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>[]
          }
          create: {
            args: Prisma.VendaItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          createMany: {
            args: Prisma.VendaItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendaItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>[]
          }
          delete: {
            args: Prisma.VendaItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          update: {
            args: Prisma.VendaItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          deleteMany: {
            args: Prisma.VendaItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendaItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VendaItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>[]
          }
          upsert: {
            args: Prisma.VendaItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendaItemPayload>
          }
          aggregate: {
            args: Prisma.VendaItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendaItem>
          }
          groupBy: {
            args: Prisma.VendaItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendaItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendaItemCountArgs<ExtArgs>
            result: $Utils.Optional<VendaItemCountAggregateOutputType> | number
          }
        }
      }
      Pagamento: {
        payload: Prisma.$PagamentoPayload<ExtArgs>
        fields: Prisma.PagamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          findFirst: {
            args: Prisma.PagamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          findMany: {
            args: Prisma.PagamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>[]
          }
          create: {
            args: Prisma.PagamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          createMany: {
            args: Prisma.PagamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>[]
          }
          delete: {
            args: Prisma.PagamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          update: {
            args: Prisma.PagamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          deleteMany: {
            args: Prisma.PagamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PagamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>[]
          }
          upsert: {
            args: Prisma.PagamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagamentoPayload>
          }
          aggregate: {
            args: Prisma.PagamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePagamento>
          }
          groupBy: {
            args: Prisma.PagamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagamentoCountArgs<ExtArgs>
            result: $Utils.Optional<PagamentoCountAggregateOutputType> | number
          }
        }
      }
      Garantia: {
        payload: Prisma.$GarantiaPayload<ExtArgs>
        fields: Prisma.GarantiaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GarantiaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GarantiaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          findFirst: {
            args: Prisma.GarantiaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GarantiaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          findMany: {
            args: Prisma.GarantiaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>[]
          }
          create: {
            args: Prisma.GarantiaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          createMany: {
            args: Prisma.GarantiaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GarantiaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>[]
          }
          delete: {
            args: Prisma.GarantiaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          update: {
            args: Prisma.GarantiaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          deleteMany: {
            args: Prisma.GarantiaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GarantiaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GarantiaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>[]
          }
          upsert: {
            args: Prisma.GarantiaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GarantiaPayload>
          }
          aggregate: {
            args: Prisma.GarantiaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGarantia>
          }
          groupBy: {
            args: Prisma.GarantiaGroupByArgs<ExtArgs>
            result: $Utils.Optional<GarantiaGroupByOutputType>[]
          }
          count: {
            args: Prisma.GarantiaCountArgs<ExtArgs>
            result: $Utils.Optional<GarantiaCountAggregateOutputType> | number
          }
        }
      }
      Assistencia: {
        payload: Prisma.$AssistenciaPayload<ExtArgs>
        fields: Prisma.AssistenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssistenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssistenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          findFirst: {
            args: Prisma.AssistenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssistenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          findMany: {
            args: Prisma.AssistenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>[]
          }
          create: {
            args: Prisma.AssistenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          createMany: {
            args: Prisma.AssistenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssistenciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>[]
          }
          delete: {
            args: Prisma.AssistenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          update: {
            args: Prisma.AssistenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          deleteMany: {
            args: Prisma.AssistenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssistenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssistenciaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>[]
          }
          upsert: {
            args: Prisma.AssistenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssistenciaPayload>
          }
          aggregate: {
            args: Prisma.AssistenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssistencia>
          }
          groupBy: {
            args: Prisma.AssistenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssistenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssistenciaCountArgs<ExtArgs>
            result: $Utils.Optional<AssistenciaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    produto?: ProdutoOmit
    lote?: LoteOmit
    aparelho?: AparelhoOmit
    venda?: VendaOmit
    vendaItem?: VendaItemOmit
    pagamento?: PagamentoOmit
    garantia?: GarantiaOmit
    assistencia?: AssistenciaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProdutoCountOutputType
   */

  export type ProdutoCountOutputType = {
    aparelhos: number
    assistencias: number
    garantias: number
    lotes: number
    vendasLegadas: number
    vendas: number
  }

  export type ProdutoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aparelhos?: boolean | ProdutoCountOutputTypeCountAparelhosArgs
    assistencias?: boolean | ProdutoCountOutputTypeCountAssistenciasArgs
    garantias?: boolean | ProdutoCountOutputTypeCountGarantiasArgs
    lotes?: boolean | ProdutoCountOutputTypeCountLotesArgs
    vendasLegadas?: boolean | ProdutoCountOutputTypeCountVendasLegadasArgs
    vendas?: boolean | ProdutoCountOutputTypeCountVendasArgs
  }

  // Custom InputTypes
  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProdutoCountOutputType
     */
    select?: ProdutoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountAparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AparelhoWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountAssistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistenciaWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountGarantiasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GarantiaWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountLotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountVendasLegadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaWhereInput
  }

  /**
   * ProdutoCountOutputType without action
   */
  export type ProdutoCountOutputTypeCountVendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaItemWhereInput
  }


  /**
   * Count Type LoteCountOutputType
   */

  export type LoteCountOutputType = {
    aparelhos: number
  }

  export type LoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aparelhos?: boolean | LoteCountOutputTypeCountAparelhosArgs
  }

  // Custom InputTypes
  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LoteCountOutputType
     */
    select?: LoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LoteCountOutputType without action
   */
  export type LoteCountOutputTypeCountAparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AparelhoWhereInput
  }


  /**
   * Count Type AparelhoCountOutputType
   */

  export type AparelhoCountOutputType = {
    assistencias: number
  }

  export type AparelhoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assistencias?: boolean | AparelhoCountOutputTypeCountAssistenciasArgs
  }

  // Custom InputTypes
  /**
   * AparelhoCountOutputType without action
   */
  export type AparelhoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AparelhoCountOutputType
     */
    select?: AparelhoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AparelhoCountOutputType without action
   */
  export type AparelhoCountOutputTypeCountAssistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistenciaWhereInput
  }


  /**
   * Count Type VendaCountOutputType
   */

  export type VendaCountOutputType = {
    itens: number
    pagamentos: number
  }

  export type VendaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itens?: boolean | VendaCountOutputTypeCountItensArgs
    pagamentos?: boolean | VendaCountOutputTypeCountPagamentosArgs
  }

  // Custom InputTypes
  /**
   * VendaCountOutputType without action
   */
  export type VendaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaCountOutputType
     */
    select?: VendaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendaCountOutputType without action
   */
  export type VendaCountOutputTypeCountItensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaItemWhereInput
  }

  /**
   * VendaCountOutputType without action
   */
  export type VendaCountOutputTypeCountPagamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagamentoWhereInput
  }


  /**
   * Count Type VendaItemCountOutputType
   */

  export type VendaItemCountOutputType = {
    aparelhos: number
  }

  export type VendaItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aparelhos?: boolean | VendaItemCountOutputTypeCountAparelhosArgs
  }

  // Custom InputTypes
  /**
   * VendaItemCountOutputType without action
   */
  export type VendaItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItemCountOutputType
     */
    select?: VendaItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendaItemCountOutputType without action
   */
  export type VendaItemCountOutputTypeCountAparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AparelhoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.Role | null
    ativo: boolean | null
    resetCode: string | null
    resetCodeExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    role: $Enums.Role | null
    ativo: boolean | null
    resetCode: string | null
    resetCodeExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    role: number
    ativo: number
    resetCode: number
    resetCodeExpiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    resetCode?: true
    resetCodeExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    resetCode?: true
    resetCodeExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    ativo?: true
    resetCode?: true
    resetCodeExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nome: string
    email: string
    senha: string
    role: $Enums.Role
    ativo: boolean
    resetCode: string | null
    resetCodeExpiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    resetCode?: boolean
    resetCodeExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    resetCode?: boolean
    resetCodeExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    resetCode?: boolean
    resetCodeExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    ativo?: boolean
    resetCode?: boolean
    resetCodeExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "role" | "ativo" | "resetCode" | "resetCodeExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["usuario"]>

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string
      senha: string
      role: $Enums.Role
      ativo: boolean
      resetCode: string | null
      resetCodeExpiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nome: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly senha: FieldRef<"Usuario", 'String'>
    readonly role: FieldRef<"Usuario", 'Role'>
    readonly ativo: FieldRef<"Usuario", 'Boolean'>
    readonly resetCode: FieldRef<"Usuario", 'String'>
    readonly resetCodeExpiresAt: FieldRef<"Usuario", 'DateTime'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
  }


  /**
   * Model Produto
   */

  export type AggregateProduto = {
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  export type ProdutoAvgAggregateOutputType = {
    id: number | null
    quantidade: number | null
    precoVendaUsd: number | null
    precoVendaBrl: number | null
  }

  export type ProdutoSumAggregateOutputType = {
    id: number | null
    quantidade: number | null
    precoVendaUsd: number | null
    precoVendaBrl: number | null
  }

  export type ProdutoMinAggregateOutputType = {
    id: number | null
    nome: string | null
    quantidade: number | null
    createdAt: Date | null
    precoVendaUsd: number | null
    precoVendaBrl: number | null
    tipoPreco: string | null
  }

  export type ProdutoMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    quantidade: number | null
    createdAt: Date | null
    precoVendaUsd: number | null
    precoVendaBrl: number | null
    tipoPreco: string | null
  }

  export type ProdutoCountAggregateOutputType = {
    id: number
    nome: number
    quantidade: number
    createdAt: number
    precoVendaUsd: number
    precoVendaBrl: number
    tipoPreco: number
    _all: number
  }


  export type ProdutoAvgAggregateInputType = {
    id?: true
    quantidade?: true
    precoVendaUsd?: true
    precoVendaBrl?: true
  }

  export type ProdutoSumAggregateInputType = {
    id?: true
    quantidade?: true
    precoVendaUsd?: true
    precoVendaBrl?: true
  }

  export type ProdutoMinAggregateInputType = {
    id?: true
    nome?: true
    quantidade?: true
    createdAt?: true
    precoVendaUsd?: true
    precoVendaBrl?: true
    tipoPreco?: true
  }

  export type ProdutoMaxAggregateInputType = {
    id?: true
    nome?: true
    quantidade?: true
    createdAt?: true
    precoVendaUsd?: true
    precoVendaBrl?: true
    tipoPreco?: true
  }

  export type ProdutoCountAggregateInputType = {
    id?: true
    nome?: true
    quantidade?: true
    createdAt?: true
    precoVendaUsd?: true
    precoVendaBrl?: true
    tipoPreco?: true
    _all?: true
  }

  export type ProdutoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produto to aggregate.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Produtos
    **/
    _count?: true | ProdutoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProdutoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProdutoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProdutoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProdutoMaxAggregateInputType
  }

  export type GetProdutoAggregateType<T extends ProdutoAggregateArgs> = {
        [P in keyof T & keyof AggregateProduto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduto[P]>
      : GetScalarType<T[P], AggregateProduto[P]>
  }




  export type ProdutoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProdutoWhereInput
    orderBy?: ProdutoOrderByWithAggregationInput | ProdutoOrderByWithAggregationInput[]
    by: ProdutoScalarFieldEnum[] | ProdutoScalarFieldEnum
    having?: ProdutoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdutoCountAggregateInputType | true
    _avg?: ProdutoAvgAggregateInputType
    _sum?: ProdutoSumAggregateInputType
    _min?: ProdutoMinAggregateInputType
    _max?: ProdutoMaxAggregateInputType
  }

  export type ProdutoGroupByOutputType = {
    id: number
    nome: string
    quantidade: number
    createdAt: Date
    precoVendaUsd: number | null
    precoVendaBrl: number | null
    tipoPreco: string | null
    _count: ProdutoCountAggregateOutputType | null
    _avg: ProdutoAvgAggregateOutputType | null
    _sum: ProdutoSumAggregateOutputType | null
    _min: ProdutoMinAggregateOutputType | null
    _max: ProdutoMaxAggregateOutputType | null
  }

  type GetProdutoGroupByPayload<T extends ProdutoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdutoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProdutoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
            : GetScalarType<T[P], ProdutoGroupByOutputType[P]>
        }
      >
    >


  export type ProdutoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    quantidade?: boolean
    createdAt?: boolean
    precoVendaUsd?: boolean
    precoVendaBrl?: boolean
    tipoPreco?: boolean
    aparelhos?: boolean | Produto$aparelhosArgs<ExtArgs>
    assistencias?: boolean | Produto$assistenciasArgs<ExtArgs>
    garantias?: boolean | Produto$garantiasArgs<ExtArgs>
    lotes?: boolean | Produto$lotesArgs<ExtArgs>
    vendasLegadas?: boolean | Produto$vendasLegadasArgs<ExtArgs>
    vendas?: boolean | Produto$vendasArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    quantidade?: boolean
    createdAt?: boolean
    precoVendaUsd?: boolean
    precoVendaBrl?: boolean
    tipoPreco?: boolean
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    quantidade?: boolean
    createdAt?: boolean
    precoVendaUsd?: boolean
    precoVendaBrl?: boolean
    tipoPreco?: boolean
  }, ExtArgs["result"]["produto"]>

  export type ProdutoSelectScalar = {
    id?: boolean
    nome?: boolean
    quantidade?: boolean
    createdAt?: boolean
    precoVendaUsd?: boolean
    precoVendaBrl?: boolean
    tipoPreco?: boolean
  }

  export type ProdutoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "quantidade" | "createdAt" | "precoVendaUsd" | "precoVendaBrl" | "tipoPreco", ExtArgs["result"]["produto"]>
  export type ProdutoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aparelhos?: boolean | Produto$aparelhosArgs<ExtArgs>
    assistencias?: boolean | Produto$assistenciasArgs<ExtArgs>
    garantias?: boolean | Produto$garantiasArgs<ExtArgs>
    lotes?: boolean | Produto$lotesArgs<ExtArgs>
    vendasLegadas?: boolean | Produto$vendasLegadasArgs<ExtArgs>
    vendas?: boolean | Produto$vendasArgs<ExtArgs>
    _count?: boolean | ProdutoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProdutoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProdutoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProdutoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Produto"
    objects: {
      aparelhos: Prisma.$AparelhoPayload<ExtArgs>[]
      assistencias: Prisma.$AssistenciaPayload<ExtArgs>[]
      garantias: Prisma.$GarantiaPayload<ExtArgs>[]
      lotes: Prisma.$LotePayload<ExtArgs>[]
      vendasLegadas: Prisma.$VendaPayload<ExtArgs>[]
      vendas: Prisma.$VendaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      quantidade: number
      createdAt: Date
      precoVendaUsd: number | null
      precoVendaBrl: number | null
      tipoPreco: string | null
    }, ExtArgs["result"]["produto"]>
    composites: {}
  }

  type ProdutoGetPayload<S extends boolean | null | undefined | ProdutoDefaultArgs> = $Result.GetResult<Prisma.$ProdutoPayload, S>

  type ProdutoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProdutoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProdutoCountAggregateInputType | true
    }

  export interface ProdutoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Produto'], meta: { name: 'Produto' } }
    /**
     * Find zero or one Produto that matches the filter.
     * @param {ProdutoFindUniqueArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProdutoFindUniqueArgs>(args: SelectSubset<T, ProdutoFindUniqueArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Produto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProdutoFindUniqueOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProdutoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProdutoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProdutoFindFirstArgs>(args?: SelectSubset<T, ProdutoFindFirstArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Produto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindFirstOrThrowArgs} args - Arguments to find a Produto
     * @example
     * // Get one Produto
     * const produto = await prisma.produto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProdutoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProdutoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Produtos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produtos
     * const produtos = await prisma.produto.findMany()
     * 
     * // Get first 10 Produtos
     * const produtos = await prisma.produto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produtoWithIdOnly = await prisma.produto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProdutoFindManyArgs>(args?: SelectSubset<T, ProdutoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Produto.
     * @param {ProdutoCreateArgs} args - Arguments to create a Produto.
     * @example
     * // Create one Produto
     * const Produto = await prisma.produto.create({
     *   data: {
     *     // ... data to create a Produto
     *   }
     * })
     * 
     */
    create<T extends ProdutoCreateArgs>(args: SelectSubset<T, ProdutoCreateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Produtos.
     * @param {ProdutoCreateManyArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProdutoCreateManyArgs>(args?: SelectSubset<T, ProdutoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Produtos and returns the data saved in the database.
     * @param {ProdutoCreateManyAndReturnArgs} args - Arguments to create many Produtos.
     * @example
     * // Create many Produtos
     * const produto = await prisma.produto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Produtos and only return the `id`
     * const produtoWithIdOnly = await prisma.produto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProdutoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProdutoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Produto.
     * @param {ProdutoDeleteArgs} args - Arguments to delete one Produto.
     * @example
     * // Delete one Produto
     * const Produto = await prisma.produto.delete({
     *   where: {
     *     // ... filter to delete one Produto
     *   }
     * })
     * 
     */
    delete<T extends ProdutoDeleteArgs>(args: SelectSubset<T, ProdutoDeleteArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Produto.
     * @param {ProdutoUpdateArgs} args - Arguments to update one Produto.
     * @example
     * // Update one Produto
     * const produto = await prisma.produto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProdutoUpdateArgs>(args: SelectSubset<T, ProdutoUpdateArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Produtos.
     * @param {ProdutoDeleteManyArgs} args - Arguments to filter Produtos to delete.
     * @example
     * // Delete a few Produtos
     * const { count } = await prisma.produto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProdutoDeleteManyArgs>(args?: SelectSubset<T, ProdutoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProdutoUpdateManyArgs>(args: SelectSubset<T, ProdutoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produtos and returns the data updated in the database.
     * @param {ProdutoUpdateManyAndReturnArgs} args - Arguments to update many Produtos.
     * @example
     * // Update many Produtos
     * const produto = await prisma.produto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Produtos and only return the `id`
     * const produtoWithIdOnly = await prisma.produto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProdutoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProdutoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Produto.
     * @param {ProdutoUpsertArgs} args - Arguments to update or create a Produto.
     * @example
     * // Update or create a Produto
     * const produto = await prisma.produto.upsert({
     *   create: {
     *     // ... data to create a Produto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produto we want to update
     *   }
     * })
     */
    upsert<T extends ProdutoUpsertArgs>(args: SelectSubset<T, ProdutoUpsertArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Produtos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoCountArgs} args - Arguments to filter Produtos to count.
     * @example
     * // Count the number of Produtos
     * const count = await prisma.produto.count({
     *   where: {
     *     // ... the filter for the Produtos we want to count
     *   }
     * })
    **/
    count<T extends ProdutoCountArgs>(
      args?: Subset<T, ProdutoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdutoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProdutoAggregateArgs>(args: Subset<T, ProdutoAggregateArgs>): Prisma.PrismaPromise<GetProdutoAggregateType<T>>

    /**
     * Group by Produto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdutoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProdutoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProdutoGroupByArgs['orderBy'] }
        : { orderBy?: ProdutoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProdutoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProdutoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Produto model
   */
  readonly fields: ProdutoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Produto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProdutoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aparelhos<T extends Produto$aparelhosArgs<ExtArgs> = {}>(args?: Subset<T, Produto$aparelhosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assistencias<T extends Produto$assistenciasArgs<ExtArgs> = {}>(args?: Subset<T, Produto$assistenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    garantias<T extends Produto$garantiasArgs<ExtArgs> = {}>(args?: Subset<T, Produto$garantiasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lotes<T extends Produto$lotesArgs<ExtArgs> = {}>(args?: Subset<T, Produto$lotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vendasLegadas<T extends Produto$vendasLegadasArgs<ExtArgs> = {}>(args?: Subset<T, Produto$vendasLegadasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vendas<T extends Produto$vendasArgs<ExtArgs> = {}>(args?: Subset<T, Produto$vendasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Produto model
   */
  interface ProdutoFieldRefs {
    readonly id: FieldRef<"Produto", 'Int'>
    readonly nome: FieldRef<"Produto", 'String'>
    readonly quantidade: FieldRef<"Produto", 'Int'>
    readonly createdAt: FieldRef<"Produto", 'DateTime'>
    readonly precoVendaUsd: FieldRef<"Produto", 'Float'>
    readonly precoVendaBrl: FieldRef<"Produto", 'Float'>
    readonly tipoPreco: FieldRef<"Produto", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Produto findUnique
   */
  export type ProdutoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findUniqueOrThrow
   */
  export type ProdutoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto findFirst
   */
  export type ProdutoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findFirstOrThrow
   */
  export type ProdutoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produto to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Produtos.
     */
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto findMany
   */
  export type ProdutoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter, which Produtos to fetch.
     */
    where?: ProdutoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Produtos to fetch.
     */
    orderBy?: ProdutoOrderByWithRelationInput | ProdutoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Produtos.
     */
    cursor?: ProdutoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Produtos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Produtos.
     */
    skip?: number
    distinct?: ProdutoScalarFieldEnum | ProdutoScalarFieldEnum[]
  }

  /**
   * Produto create
   */
  export type ProdutoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to create a Produto.
     */
    data: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
  }

  /**
   * Produto createMany
   */
  export type ProdutoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
  }

  /**
   * Produto createManyAndReturn
   */
  export type ProdutoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to create many Produtos.
     */
    data: ProdutoCreateManyInput | ProdutoCreateManyInput[]
  }

  /**
   * Produto update
   */
  export type ProdutoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The data needed to update a Produto.
     */
    data: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
    /**
     * Choose, which Produto to update.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto updateMany
   */
  export type ProdutoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto updateManyAndReturn
   */
  export type ProdutoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * The data used to update Produtos.
     */
    data: XOR<ProdutoUpdateManyMutationInput, ProdutoUncheckedUpdateManyInput>
    /**
     * Filter which Produtos to update
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to update.
     */
    limit?: number
  }

  /**
   * Produto upsert
   */
  export type ProdutoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * The filter to search for the Produto to update in case it exists.
     */
    where: ProdutoWhereUniqueInput
    /**
     * In case the Produto found by the `where` argument doesn't exist, create a new Produto with this data.
     */
    create: XOR<ProdutoCreateInput, ProdutoUncheckedCreateInput>
    /**
     * In case the Produto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProdutoUpdateInput, ProdutoUncheckedUpdateInput>
  }

  /**
   * Produto delete
   */
  export type ProdutoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    /**
     * Filter which Produto to delete.
     */
    where: ProdutoWhereUniqueInput
  }

  /**
   * Produto deleteMany
   */
  export type ProdutoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Produtos to delete
     */
    where?: ProdutoWhereInput
    /**
     * Limit how many Produtos to delete.
     */
    limit?: number
  }

  /**
   * Produto.aparelhos
   */
  export type Produto$aparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    where?: AparelhoWhereInput
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    cursor?: AparelhoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * Produto.assistencias
   */
  export type Produto$assistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    where?: AssistenciaWhereInput
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    cursor?: AssistenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistenciaScalarFieldEnum | AssistenciaScalarFieldEnum[]
  }

  /**
   * Produto.garantias
   */
  export type Produto$garantiasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    where?: GarantiaWhereInput
    orderBy?: GarantiaOrderByWithRelationInput | GarantiaOrderByWithRelationInput[]
    cursor?: GarantiaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GarantiaScalarFieldEnum | GarantiaScalarFieldEnum[]
  }

  /**
   * Produto.lotes
   */
  export type Produto$lotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    cursor?: LoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Produto.vendasLegadas
   */
  export type Produto$vendasLegadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    where?: VendaWhereInput
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    cursor?: VendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Produto.vendas
   */
  export type Produto$vendasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    where?: VendaItemWhereInput
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    cursor?: VendaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendaItemScalarFieldEnum | VendaItemScalarFieldEnum[]
  }

  /**
   * Produto without action
   */
  export type ProdutoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
  }


  /**
   * Model Lote
   */

  export type AggregateLote = {
    _count: LoteCountAggregateOutputType | null
    _avg: LoteAvgAggregateOutputType | null
    _sum: LoteSumAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  export type LoteAvgAggregateOutputType = {
    id: number | null
    precoCompraUsd: number | null
    precoCompraBrl: number | null
    quantidade: number | null
    produtoId: number | null
  }

  export type LoteSumAggregateOutputType = {
    id: number | null
    precoCompraUsd: number | null
    precoCompraBrl: number | null
    quantidade: number | null
    produtoId: number | null
  }

  export type LoteMinAggregateOutputType = {
    id: number | null
    fornecedor: string | null
    precoCompraUsd: number | null
    precoCompraBrl: number | null
    tipoCusto: string | null
    quantidade: number | null
    observacao: string | null
    createdAt: Date | null
    produtoId: number | null
  }

  export type LoteMaxAggregateOutputType = {
    id: number | null
    fornecedor: string | null
    precoCompraUsd: number | null
    precoCompraBrl: number | null
    tipoCusto: string | null
    quantidade: number | null
    observacao: string | null
    createdAt: Date | null
    produtoId: number | null
  }

  export type LoteCountAggregateOutputType = {
    id: number
    fornecedor: number
    precoCompraUsd: number
    precoCompraBrl: number
    tipoCusto: number
    quantidade: number
    observacao: number
    createdAt: number
    produtoId: number
    _all: number
  }


  export type LoteAvgAggregateInputType = {
    id?: true
    precoCompraUsd?: true
    precoCompraBrl?: true
    quantidade?: true
    produtoId?: true
  }

  export type LoteSumAggregateInputType = {
    id?: true
    precoCompraUsd?: true
    precoCompraBrl?: true
    quantidade?: true
    produtoId?: true
  }

  export type LoteMinAggregateInputType = {
    id?: true
    fornecedor?: true
    precoCompraUsd?: true
    precoCompraBrl?: true
    tipoCusto?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
  }

  export type LoteMaxAggregateInputType = {
    id?: true
    fornecedor?: true
    precoCompraUsd?: true
    precoCompraBrl?: true
    tipoCusto?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
  }

  export type LoteCountAggregateInputType = {
    id?: true
    fornecedor?: true
    precoCompraUsd?: true
    precoCompraBrl?: true
    tipoCusto?: true
    quantidade?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
    _all?: true
  }

  export type LoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lote to aggregate.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lotes
    **/
    _count?: true | LoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoteMaxAggregateInputType
  }

  export type GetLoteAggregateType<T extends LoteAggregateArgs> = {
        [P in keyof T & keyof AggregateLote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLote[P]>
      : GetScalarType<T[P], AggregateLote[P]>
  }




  export type LoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoteWhereInput
    orderBy?: LoteOrderByWithAggregationInput | LoteOrderByWithAggregationInput[]
    by: LoteScalarFieldEnum[] | LoteScalarFieldEnum
    having?: LoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoteCountAggregateInputType | true
    _avg?: LoteAvgAggregateInputType
    _sum?: LoteSumAggregateInputType
    _min?: LoteMinAggregateInputType
    _max?: LoteMaxAggregateInputType
  }

  export type LoteGroupByOutputType = {
    id: number
    fornecedor: string | null
    precoCompraUsd: number | null
    precoCompraBrl: number | null
    tipoCusto: string | null
    quantidade: number
    observacao: string | null
    createdAt: Date
    produtoId: number
    _count: LoteCountAggregateOutputType | null
    _avg: LoteAvgAggregateOutputType | null
    _sum: LoteSumAggregateOutputType | null
    _min: LoteMinAggregateOutputType | null
    _max: LoteMaxAggregateOutputType | null
  }

  type GetLoteGroupByPayload<T extends LoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoteGroupByOutputType[P]>
            : GetScalarType<T[P], LoteGroupByOutputType[P]>
        }
      >
    >


  export type LoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fornecedor?: boolean
    precoCompraUsd?: boolean
    precoCompraBrl?: boolean
    tipoCusto?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelhos?: boolean | Lote$aparelhosArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fornecedor?: boolean
    precoCompraUsd?: boolean
    precoCompraBrl?: boolean
    tipoCusto?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fornecedor?: boolean
    precoCompraUsd?: boolean
    precoCompraBrl?: boolean
    tipoCusto?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lote"]>

  export type LoteSelectScalar = {
    id?: boolean
    fornecedor?: boolean
    precoCompraUsd?: boolean
    precoCompraBrl?: boolean
    tipoCusto?: boolean
    quantidade?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
  }

  export type LoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fornecedor" | "precoCompraUsd" | "precoCompraBrl" | "tipoCusto" | "quantidade" | "observacao" | "createdAt" | "produtoId", ExtArgs["result"]["lote"]>
  export type LoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelhos?: boolean | Lote$aparelhosArgs<ExtArgs>
    _count?: boolean | LoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type LoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $LotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lote"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
      aparelhos: Prisma.$AparelhoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fornecedor: string | null
      precoCompraUsd: number | null
      precoCompraBrl: number | null
      tipoCusto: string | null
      quantidade: number
      observacao: string | null
      createdAt: Date
      produtoId: number
    }, ExtArgs["result"]["lote"]>
    composites: {}
  }

  type LoteGetPayload<S extends boolean | null | undefined | LoteDefaultArgs> = $Result.GetResult<Prisma.$LotePayload, S>

  type LoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LoteCountAggregateInputType | true
    }

  export interface LoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lote'], meta: { name: 'Lote' } }
    /**
     * Find zero or one Lote that matches the filter.
     * @param {LoteFindUniqueArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoteFindUniqueArgs>(args: SelectSubset<T, LoteFindUniqueArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoteFindUniqueOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoteFindUniqueOrThrowArgs>(args: SelectSubset<T, LoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoteFindFirstArgs>(args?: SelectSubset<T, LoteFindFirstArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindFirstOrThrowArgs} args - Arguments to find a Lote
     * @example
     * // Get one Lote
     * const lote = await prisma.lote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoteFindFirstOrThrowArgs>(args?: SelectSubset<T, LoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lotes
     * const lotes = await prisma.lote.findMany()
     * 
     * // Get first 10 Lotes
     * const lotes = await prisma.lote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loteWithIdOnly = await prisma.lote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoteFindManyArgs>(args?: SelectSubset<T, LoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lote.
     * @param {LoteCreateArgs} args - Arguments to create a Lote.
     * @example
     * // Create one Lote
     * const Lote = await prisma.lote.create({
     *   data: {
     *     // ... data to create a Lote
     *   }
     * })
     * 
     */
    create<T extends LoteCreateArgs>(args: SelectSubset<T, LoteCreateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lotes.
     * @param {LoteCreateManyArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoteCreateManyArgs>(args?: SelectSubset<T, LoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lotes and returns the data saved in the database.
     * @param {LoteCreateManyAndReturnArgs} args - Arguments to create many Lotes.
     * @example
     * // Create many Lotes
     * const lote = await prisma.lote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lotes and only return the `id`
     * const loteWithIdOnly = await prisma.lote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoteCreateManyAndReturnArgs>(args?: SelectSubset<T, LoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lote.
     * @param {LoteDeleteArgs} args - Arguments to delete one Lote.
     * @example
     * // Delete one Lote
     * const Lote = await prisma.lote.delete({
     *   where: {
     *     // ... filter to delete one Lote
     *   }
     * })
     * 
     */
    delete<T extends LoteDeleteArgs>(args: SelectSubset<T, LoteDeleteArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lote.
     * @param {LoteUpdateArgs} args - Arguments to update one Lote.
     * @example
     * // Update one Lote
     * const lote = await prisma.lote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoteUpdateArgs>(args: SelectSubset<T, LoteUpdateArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lotes.
     * @param {LoteDeleteManyArgs} args - Arguments to filter Lotes to delete.
     * @example
     * // Delete a few Lotes
     * const { count } = await prisma.lote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoteDeleteManyArgs>(args?: SelectSubset<T, LoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lotes
     * const lote = await prisma.lote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoteUpdateManyArgs>(args: SelectSubset<T, LoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lotes and returns the data updated in the database.
     * @param {LoteUpdateManyAndReturnArgs} args - Arguments to update many Lotes.
     * @example
     * // Update many Lotes
     * const lote = await prisma.lote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lotes and only return the `id`
     * const loteWithIdOnly = await prisma.lote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LoteUpdateManyAndReturnArgs>(args: SelectSubset<T, LoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lote.
     * @param {LoteUpsertArgs} args - Arguments to update or create a Lote.
     * @example
     * // Update or create a Lote
     * const lote = await prisma.lote.upsert({
     *   create: {
     *     // ... data to create a Lote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lote we want to update
     *   }
     * })
     */
    upsert<T extends LoteUpsertArgs>(args: SelectSubset<T, LoteUpsertArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteCountArgs} args - Arguments to filter Lotes to count.
     * @example
     * // Count the number of Lotes
     * const count = await prisma.lote.count({
     *   where: {
     *     // ... the filter for the Lotes we want to count
     *   }
     * })
    **/
    count<T extends LoteCountArgs>(
      args?: Subset<T, LoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoteAggregateArgs>(args: Subset<T, LoteAggregateArgs>): Prisma.PrismaPromise<GetLoteAggregateType<T>>

    /**
     * Group by Lote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoteGroupByArgs['orderBy'] }
        : { orderBy?: LoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lote model
   */
  readonly fields: LoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aparelhos<T extends Lote$aparelhosArgs<ExtArgs> = {}>(args?: Subset<T, Lote$aparelhosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lote model
   */
  interface LoteFieldRefs {
    readonly id: FieldRef<"Lote", 'Int'>
    readonly fornecedor: FieldRef<"Lote", 'String'>
    readonly precoCompraUsd: FieldRef<"Lote", 'Float'>
    readonly precoCompraBrl: FieldRef<"Lote", 'Float'>
    readonly tipoCusto: FieldRef<"Lote", 'String'>
    readonly quantidade: FieldRef<"Lote", 'Int'>
    readonly observacao: FieldRef<"Lote", 'String'>
    readonly createdAt: FieldRef<"Lote", 'DateTime'>
    readonly produtoId: FieldRef<"Lote", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Lote findUnique
   */
  export type LoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findUniqueOrThrow
   */
  export type LoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote findFirst
   */
  export type LoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findFirstOrThrow
   */
  export type LoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lote to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lotes.
     */
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote findMany
   */
  export type LoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter, which Lotes to fetch.
     */
    where?: LoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lotes to fetch.
     */
    orderBy?: LoteOrderByWithRelationInput | LoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lotes.
     */
    cursor?: LoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lotes.
     */
    skip?: number
    distinct?: LoteScalarFieldEnum | LoteScalarFieldEnum[]
  }

  /**
   * Lote create
   */
  export type LoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Lote.
     */
    data: XOR<LoteCreateInput, LoteUncheckedCreateInput>
  }

  /**
   * Lote createMany
   */
  export type LoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
  }

  /**
   * Lote createManyAndReturn
   */
  export type LoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * The data used to create many Lotes.
     */
    data: LoteCreateManyInput | LoteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lote update
   */
  export type LoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Lote.
     */
    data: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
    /**
     * Choose, which Lote to update.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote updateMany
   */
  export type LoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lotes.
     */
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
  }

  /**
   * Lote updateManyAndReturn
   */
  export type LoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * The data used to update Lotes.
     */
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyInput>
    /**
     * Filter which Lotes to update
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lote upsert
   */
  export type LoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Lote to update in case it exists.
     */
    where: LoteWhereUniqueInput
    /**
     * In case the Lote found by the `where` argument doesn't exist, create a new Lote with this data.
     */
    create: XOR<LoteCreateInput, LoteUncheckedCreateInput>
    /**
     * In case the Lote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoteUpdateInput, LoteUncheckedUpdateInput>
  }

  /**
   * Lote delete
   */
  export type LoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
    /**
     * Filter which Lote to delete.
     */
    where: LoteWhereUniqueInput
  }

  /**
   * Lote deleteMany
   */
  export type LoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lotes to delete
     */
    where?: LoteWhereInput
    /**
     * Limit how many Lotes to delete.
     */
    limit?: number
  }

  /**
   * Lote.aparelhos
   */
  export type Lote$aparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    where?: AparelhoWhereInput
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    cursor?: AparelhoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * Lote without action
   */
  export type LoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lote
     */
    select?: LoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lote
     */
    omit?: LoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoteInclude<ExtArgs> | null
  }


  /**
   * Model Aparelho
   */

  export type AggregateAparelho = {
    _count: AparelhoCountAggregateOutputType | null
    _avg: AparelhoAvgAggregateOutputType | null
    _sum: AparelhoSumAggregateOutputType | null
    _min: AparelhoMinAggregateOutputType | null
    _max: AparelhoMaxAggregateOutputType | null
  }

  export type AparelhoAvgAggregateOutputType = {
    id: number | null
    loteId: number | null
    produtoId: number | null
    vendaItemId: number | null
  }

  export type AparelhoSumAggregateOutputType = {
    id: number | null
    loteId: number | null
    produtoId: number | null
    vendaItemId: number | null
  }

  export type AparelhoMinAggregateOutputType = {
    id: number | null
    imei: string | null
    vendido: boolean | null
    createdAt: Date | null
    loteId: number | null
    produtoId: number | null
    vendaItemId: number | null
  }

  export type AparelhoMaxAggregateOutputType = {
    id: number | null
    imei: string | null
    vendido: boolean | null
    createdAt: Date | null
    loteId: number | null
    produtoId: number | null
    vendaItemId: number | null
  }

  export type AparelhoCountAggregateOutputType = {
    id: number
    imei: number
    vendido: number
    createdAt: number
    loteId: number
    produtoId: number
    vendaItemId: number
    _all: number
  }


  export type AparelhoAvgAggregateInputType = {
    id?: true
    loteId?: true
    produtoId?: true
    vendaItemId?: true
  }

  export type AparelhoSumAggregateInputType = {
    id?: true
    loteId?: true
    produtoId?: true
    vendaItemId?: true
  }

  export type AparelhoMinAggregateInputType = {
    id?: true
    imei?: true
    vendido?: true
    createdAt?: true
    loteId?: true
    produtoId?: true
    vendaItemId?: true
  }

  export type AparelhoMaxAggregateInputType = {
    id?: true
    imei?: true
    vendido?: true
    createdAt?: true
    loteId?: true
    produtoId?: true
    vendaItemId?: true
  }

  export type AparelhoCountAggregateInputType = {
    id?: true
    imei?: true
    vendido?: true
    createdAt?: true
    loteId?: true
    produtoId?: true
    vendaItemId?: true
    _all?: true
  }

  export type AparelhoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aparelho to aggregate.
     */
    where?: AparelhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aparelhos to fetch.
     */
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AparelhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aparelhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aparelhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aparelhos
    **/
    _count?: true | AparelhoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AparelhoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AparelhoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AparelhoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AparelhoMaxAggregateInputType
  }

  export type GetAparelhoAggregateType<T extends AparelhoAggregateArgs> = {
        [P in keyof T & keyof AggregateAparelho]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAparelho[P]>
      : GetScalarType<T[P], AggregateAparelho[P]>
  }




  export type AparelhoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AparelhoWhereInput
    orderBy?: AparelhoOrderByWithAggregationInput | AparelhoOrderByWithAggregationInput[]
    by: AparelhoScalarFieldEnum[] | AparelhoScalarFieldEnum
    having?: AparelhoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AparelhoCountAggregateInputType | true
    _avg?: AparelhoAvgAggregateInputType
    _sum?: AparelhoSumAggregateInputType
    _min?: AparelhoMinAggregateInputType
    _max?: AparelhoMaxAggregateInputType
  }

  export type AparelhoGroupByOutputType = {
    id: number
    imei: string
    vendido: boolean
    createdAt: Date
    loteId: number
    produtoId: number
    vendaItemId: number | null
    _count: AparelhoCountAggregateOutputType | null
    _avg: AparelhoAvgAggregateOutputType | null
    _sum: AparelhoSumAggregateOutputType | null
    _min: AparelhoMinAggregateOutputType | null
    _max: AparelhoMaxAggregateOutputType | null
  }

  type GetAparelhoGroupByPayload<T extends AparelhoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AparelhoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AparelhoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AparelhoGroupByOutputType[P]>
            : GetScalarType<T[P], AparelhoGroupByOutputType[P]>
        }
      >
    >


  export type AparelhoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imei?: boolean
    vendido?: boolean
    createdAt?: boolean
    loteId?: boolean
    produtoId?: boolean
    vendaItemId?: boolean
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
    assistencias?: boolean | Aparelho$assistenciasArgs<ExtArgs>
    _count?: boolean | AparelhoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aparelho"]>

  export type AparelhoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imei?: boolean
    vendido?: boolean
    createdAt?: boolean
    loteId?: boolean
    produtoId?: boolean
    vendaItemId?: boolean
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
  }, ExtArgs["result"]["aparelho"]>

  export type AparelhoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imei?: boolean
    vendido?: boolean
    createdAt?: boolean
    loteId?: boolean
    produtoId?: boolean
    vendaItemId?: boolean
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
  }, ExtArgs["result"]["aparelho"]>

  export type AparelhoSelectScalar = {
    id?: boolean
    imei?: boolean
    vendido?: boolean
    createdAt?: boolean
    loteId?: boolean
    produtoId?: boolean
    vendaItemId?: boolean
  }

  export type AparelhoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imei" | "vendido" | "createdAt" | "loteId" | "produtoId" | "vendaItemId", ExtArgs["result"]["aparelho"]>
  export type AparelhoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
    assistencias?: boolean | Aparelho$assistenciasArgs<ExtArgs>
    _count?: boolean | AparelhoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AparelhoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
  }
  export type AparelhoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lote?: boolean | LoteDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    vendaItem?: boolean | Aparelho$vendaItemArgs<ExtArgs>
  }

  export type $AparelhoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aparelho"
    objects: {
      lote: Prisma.$LotePayload<ExtArgs>
      produto: Prisma.$ProdutoPayload<ExtArgs>
      vendaItem: Prisma.$VendaItemPayload<ExtArgs> | null
      assistencias: Prisma.$AssistenciaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imei: string
      vendido: boolean
      createdAt: Date
      loteId: number
      produtoId: number
      vendaItemId: number | null
    }, ExtArgs["result"]["aparelho"]>
    composites: {}
  }

  type AparelhoGetPayload<S extends boolean | null | undefined | AparelhoDefaultArgs> = $Result.GetResult<Prisma.$AparelhoPayload, S>

  type AparelhoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AparelhoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AparelhoCountAggregateInputType | true
    }

  export interface AparelhoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aparelho'], meta: { name: 'Aparelho' } }
    /**
     * Find zero or one Aparelho that matches the filter.
     * @param {AparelhoFindUniqueArgs} args - Arguments to find a Aparelho
     * @example
     * // Get one Aparelho
     * const aparelho = await prisma.aparelho.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AparelhoFindUniqueArgs>(args: SelectSubset<T, AparelhoFindUniqueArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Aparelho that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AparelhoFindUniqueOrThrowArgs} args - Arguments to find a Aparelho
     * @example
     * // Get one Aparelho
     * const aparelho = await prisma.aparelho.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AparelhoFindUniqueOrThrowArgs>(args: SelectSubset<T, AparelhoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aparelho that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoFindFirstArgs} args - Arguments to find a Aparelho
     * @example
     * // Get one Aparelho
     * const aparelho = await prisma.aparelho.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AparelhoFindFirstArgs>(args?: SelectSubset<T, AparelhoFindFirstArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aparelho that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoFindFirstOrThrowArgs} args - Arguments to find a Aparelho
     * @example
     * // Get one Aparelho
     * const aparelho = await prisma.aparelho.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AparelhoFindFirstOrThrowArgs>(args?: SelectSubset<T, AparelhoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Aparelhos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aparelhos
     * const aparelhos = await prisma.aparelho.findMany()
     * 
     * // Get first 10 Aparelhos
     * const aparelhos = await prisma.aparelho.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aparelhoWithIdOnly = await prisma.aparelho.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AparelhoFindManyArgs>(args?: SelectSubset<T, AparelhoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Aparelho.
     * @param {AparelhoCreateArgs} args - Arguments to create a Aparelho.
     * @example
     * // Create one Aparelho
     * const Aparelho = await prisma.aparelho.create({
     *   data: {
     *     // ... data to create a Aparelho
     *   }
     * })
     * 
     */
    create<T extends AparelhoCreateArgs>(args: SelectSubset<T, AparelhoCreateArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Aparelhos.
     * @param {AparelhoCreateManyArgs} args - Arguments to create many Aparelhos.
     * @example
     * // Create many Aparelhos
     * const aparelho = await prisma.aparelho.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AparelhoCreateManyArgs>(args?: SelectSubset<T, AparelhoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aparelhos and returns the data saved in the database.
     * @param {AparelhoCreateManyAndReturnArgs} args - Arguments to create many Aparelhos.
     * @example
     * // Create many Aparelhos
     * const aparelho = await prisma.aparelho.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aparelhos and only return the `id`
     * const aparelhoWithIdOnly = await prisma.aparelho.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AparelhoCreateManyAndReturnArgs>(args?: SelectSubset<T, AparelhoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Aparelho.
     * @param {AparelhoDeleteArgs} args - Arguments to delete one Aparelho.
     * @example
     * // Delete one Aparelho
     * const Aparelho = await prisma.aparelho.delete({
     *   where: {
     *     // ... filter to delete one Aparelho
     *   }
     * })
     * 
     */
    delete<T extends AparelhoDeleteArgs>(args: SelectSubset<T, AparelhoDeleteArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Aparelho.
     * @param {AparelhoUpdateArgs} args - Arguments to update one Aparelho.
     * @example
     * // Update one Aparelho
     * const aparelho = await prisma.aparelho.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AparelhoUpdateArgs>(args: SelectSubset<T, AparelhoUpdateArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Aparelhos.
     * @param {AparelhoDeleteManyArgs} args - Arguments to filter Aparelhos to delete.
     * @example
     * // Delete a few Aparelhos
     * const { count } = await prisma.aparelho.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AparelhoDeleteManyArgs>(args?: SelectSubset<T, AparelhoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aparelhos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aparelhos
     * const aparelho = await prisma.aparelho.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AparelhoUpdateManyArgs>(args: SelectSubset<T, AparelhoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aparelhos and returns the data updated in the database.
     * @param {AparelhoUpdateManyAndReturnArgs} args - Arguments to update many Aparelhos.
     * @example
     * // Update many Aparelhos
     * const aparelho = await prisma.aparelho.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Aparelhos and only return the `id`
     * const aparelhoWithIdOnly = await prisma.aparelho.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AparelhoUpdateManyAndReturnArgs>(args: SelectSubset<T, AparelhoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Aparelho.
     * @param {AparelhoUpsertArgs} args - Arguments to update or create a Aparelho.
     * @example
     * // Update or create a Aparelho
     * const aparelho = await prisma.aparelho.upsert({
     *   create: {
     *     // ... data to create a Aparelho
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aparelho we want to update
     *   }
     * })
     */
    upsert<T extends AparelhoUpsertArgs>(args: SelectSubset<T, AparelhoUpsertArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Aparelhos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoCountArgs} args - Arguments to filter Aparelhos to count.
     * @example
     * // Count the number of Aparelhos
     * const count = await prisma.aparelho.count({
     *   where: {
     *     // ... the filter for the Aparelhos we want to count
     *   }
     * })
    **/
    count<T extends AparelhoCountArgs>(
      args?: Subset<T, AparelhoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AparelhoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aparelho.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AparelhoAggregateArgs>(args: Subset<T, AparelhoAggregateArgs>): Prisma.PrismaPromise<GetAparelhoAggregateType<T>>

    /**
     * Group by Aparelho.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AparelhoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AparelhoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AparelhoGroupByArgs['orderBy'] }
        : { orderBy?: AparelhoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AparelhoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAparelhoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aparelho model
   */
  readonly fields: AparelhoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aparelho.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AparelhoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lote<T extends LoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LoteDefaultArgs<ExtArgs>>): Prisma__LoteClient<$Result.GetResult<Prisma.$LotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vendaItem<T extends Aparelho$vendaItemArgs<ExtArgs> = {}>(args?: Subset<T, Aparelho$vendaItemArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assistencias<T extends Aparelho$assistenciasArgs<ExtArgs> = {}>(args?: Subset<T, Aparelho$assistenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Aparelho model
   */
  interface AparelhoFieldRefs {
    readonly id: FieldRef<"Aparelho", 'Int'>
    readonly imei: FieldRef<"Aparelho", 'String'>
    readonly vendido: FieldRef<"Aparelho", 'Boolean'>
    readonly createdAt: FieldRef<"Aparelho", 'DateTime'>
    readonly loteId: FieldRef<"Aparelho", 'Int'>
    readonly produtoId: FieldRef<"Aparelho", 'Int'>
    readonly vendaItemId: FieldRef<"Aparelho", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Aparelho findUnique
   */
  export type AparelhoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter, which Aparelho to fetch.
     */
    where: AparelhoWhereUniqueInput
  }

  /**
   * Aparelho findUniqueOrThrow
   */
  export type AparelhoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter, which Aparelho to fetch.
     */
    where: AparelhoWhereUniqueInput
  }

  /**
   * Aparelho findFirst
   */
  export type AparelhoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter, which Aparelho to fetch.
     */
    where?: AparelhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aparelhos to fetch.
     */
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aparelhos.
     */
    cursor?: AparelhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aparelhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aparelhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aparelhos.
     */
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * Aparelho findFirstOrThrow
   */
  export type AparelhoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter, which Aparelho to fetch.
     */
    where?: AparelhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aparelhos to fetch.
     */
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aparelhos.
     */
    cursor?: AparelhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aparelhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aparelhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aparelhos.
     */
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * Aparelho findMany
   */
  export type AparelhoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter, which Aparelhos to fetch.
     */
    where?: AparelhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aparelhos to fetch.
     */
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aparelhos.
     */
    cursor?: AparelhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aparelhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aparelhos.
     */
    skip?: number
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * Aparelho create
   */
  export type AparelhoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * The data needed to create a Aparelho.
     */
    data: XOR<AparelhoCreateInput, AparelhoUncheckedCreateInput>
  }

  /**
   * Aparelho createMany
   */
  export type AparelhoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aparelhos.
     */
    data: AparelhoCreateManyInput | AparelhoCreateManyInput[]
  }

  /**
   * Aparelho createManyAndReturn
   */
  export type AparelhoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * The data used to create many Aparelhos.
     */
    data: AparelhoCreateManyInput | AparelhoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Aparelho update
   */
  export type AparelhoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * The data needed to update a Aparelho.
     */
    data: XOR<AparelhoUpdateInput, AparelhoUncheckedUpdateInput>
    /**
     * Choose, which Aparelho to update.
     */
    where: AparelhoWhereUniqueInput
  }

  /**
   * Aparelho updateMany
   */
  export type AparelhoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aparelhos.
     */
    data: XOR<AparelhoUpdateManyMutationInput, AparelhoUncheckedUpdateManyInput>
    /**
     * Filter which Aparelhos to update
     */
    where?: AparelhoWhereInput
    /**
     * Limit how many Aparelhos to update.
     */
    limit?: number
  }

  /**
   * Aparelho updateManyAndReturn
   */
  export type AparelhoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * The data used to update Aparelhos.
     */
    data: XOR<AparelhoUpdateManyMutationInput, AparelhoUncheckedUpdateManyInput>
    /**
     * Filter which Aparelhos to update
     */
    where?: AparelhoWhereInput
    /**
     * Limit how many Aparelhos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Aparelho upsert
   */
  export type AparelhoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * The filter to search for the Aparelho to update in case it exists.
     */
    where: AparelhoWhereUniqueInput
    /**
     * In case the Aparelho found by the `where` argument doesn't exist, create a new Aparelho with this data.
     */
    create: XOR<AparelhoCreateInput, AparelhoUncheckedCreateInput>
    /**
     * In case the Aparelho was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AparelhoUpdateInput, AparelhoUncheckedUpdateInput>
  }

  /**
   * Aparelho delete
   */
  export type AparelhoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    /**
     * Filter which Aparelho to delete.
     */
    where: AparelhoWhereUniqueInput
  }

  /**
   * Aparelho deleteMany
   */
  export type AparelhoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aparelhos to delete
     */
    where?: AparelhoWhereInput
    /**
     * Limit how many Aparelhos to delete.
     */
    limit?: number
  }

  /**
   * Aparelho.vendaItem
   */
  export type Aparelho$vendaItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    where?: VendaItemWhereInput
  }

  /**
   * Aparelho.assistencias
   */
  export type Aparelho$assistenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    where?: AssistenciaWhereInput
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    cursor?: AssistenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssistenciaScalarFieldEnum | AssistenciaScalarFieldEnum[]
  }

  /**
   * Aparelho without action
   */
  export type AparelhoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
  }


  /**
   * Model Venda
   */

  export type AggregateVenda = {
    _count: VendaCountAggregateOutputType | null
    _avg: VendaAvgAggregateOutputType | null
    _sum: VendaSumAggregateOutputType | null
    _min: VendaMinAggregateOutputType | null
    _max: VendaMaxAggregateOutputType | null
  }

  export type VendaAvgAggregateOutputType = {
    id: number | null
    taxa: number | null
    produtoId: number | null
    quantidade: number | null
    valorVenda: number | null
    precoCompraUsd: number | null
    desconto: number | null
  }

  export type VendaSumAggregateOutputType = {
    id: number | null
    taxa: number | null
    produtoId: number | null
    quantidade: number | null
    valorVenda: number | null
    precoCompraUsd: number | null
    desconto: number | null
  }

  export type VendaMinAggregateOutputType = {
    id: number | null
    cliente: string | null
    taxa: number | null
    taxaFechada: boolean | null
    dataVenda: Date | null
    createdAt: Date | null
    produtoId: number | null
    quantidade: number | null
    valorVenda: number | null
    precoCompraUsd: number | null
    formaPagamento: string | null
    estadoFatura: string | null
    desconto: number | null
  }

  export type VendaMaxAggregateOutputType = {
    id: number | null
    cliente: string | null
    taxa: number | null
    taxaFechada: boolean | null
    dataVenda: Date | null
    createdAt: Date | null
    produtoId: number | null
    quantidade: number | null
    valorVenda: number | null
    precoCompraUsd: number | null
    formaPagamento: string | null
    estadoFatura: string | null
    desconto: number | null
  }

  export type VendaCountAggregateOutputType = {
    id: number
    cliente: number
    taxa: number
    taxaFechada: number
    dataVenda: number
    createdAt: number
    produtoId: number
    quantidade: number
    valorVenda: number
    precoCompraUsd: number
    formaPagamento: number
    estadoFatura: number
    desconto: number
    _all: number
  }


  export type VendaAvgAggregateInputType = {
    id?: true
    taxa?: true
    produtoId?: true
    quantidade?: true
    valorVenda?: true
    precoCompraUsd?: true
    desconto?: true
  }

  export type VendaSumAggregateInputType = {
    id?: true
    taxa?: true
    produtoId?: true
    quantidade?: true
    valorVenda?: true
    precoCompraUsd?: true
    desconto?: true
  }

  export type VendaMinAggregateInputType = {
    id?: true
    cliente?: true
    taxa?: true
    taxaFechada?: true
    dataVenda?: true
    createdAt?: true
    produtoId?: true
    quantidade?: true
    valorVenda?: true
    precoCompraUsd?: true
    formaPagamento?: true
    estadoFatura?: true
    desconto?: true
  }

  export type VendaMaxAggregateInputType = {
    id?: true
    cliente?: true
    taxa?: true
    taxaFechada?: true
    dataVenda?: true
    createdAt?: true
    produtoId?: true
    quantidade?: true
    valorVenda?: true
    precoCompraUsd?: true
    formaPagamento?: true
    estadoFatura?: true
    desconto?: true
  }

  export type VendaCountAggregateInputType = {
    id?: true
    cliente?: true
    taxa?: true
    taxaFechada?: true
    dataVenda?: true
    createdAt?: true
    produtoId?: true
    quantidade?: true
    valorVenda?: true
    precoCompraUsd?: true
    formaPagamento?: true
    estadoFatura?: true
    desconto?: true
    _all?: true
  }

  export type VendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venda to aggregate.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendas
    **/
    _count?: true | VendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendaMaxAggregateInputType
  }

  export type GetVendaAggregateType<T extends VendaAggregateArgs> = {
        [P in keyof T & keyof AggregateVenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenda[P]>
      : GetScalarType<T[P], AggregateVenda[P]>
  }




  export type VendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaWhereInput
    orderBy?: VendaOrderByWithAggregationInput | VendaOrderByWithAggregationInput[]
    by: VendaScalarFieldEnum[] | VendaScalarFieldEnum
    having?: VendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendaCountAggregateInputType | true
    _avg?: VendaAvgAggregateInputType
    _sum?: VendaSumAggregateInputType
    _min?: VendaMinAggregateInputType
    _max?: VendaMaxAggregateInputType
  }

  export type VendaGroupByOutputType = {
    id: number
    cliente: string
    taxa: number | null
    taxaFechada: boolean
    dataVenda: Date
    createdAt: Date
    produtoId: number | null
    quantidade: number | null
    valorVenda: number | null
    precoCompraUsd: number | null
    formaPagamento: string | null
    estadoFatura: string | null
    desconto: number
    _count: VendaCountAggregateOutputType | null
    _avg: VendaAvgAggregateOutputType | null
    _sum: VendaSumAggregateOutputType | null
    _min: VendaMinAggregateOutputType | null
    _max: VendaMaxAggregateOutputType | null
  }

  type GetVendaGroupByPayload<T extends VendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendaGroupByOutputType[P]>
            : GetScalarType<T[P], VendaGroupByOutputType[P]>
        }
      >
    >


  export type VendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    taxa?: boolean
    taxaFechada?: boolean
    dataVenda?: boolean
    createdAt?: boolean
    produtoId?: boolean
    quantidade?: boolean
    valorVenda?: boolean
    precoCompraUsd?: boolean
    formaPagamento?: boolean
    estadoFatura?: boolean
    desconto?: boolean
    produto?: boolean | Venda$produtoArgs<ExtArgs>
    itens?: boolean | Venda$itensArgs<ExtArgs>
    pagamentos?: boolean | Venda$pagamentosArgs<ExtArgs>
    _count?: boolean | VendaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venda"]>

  export type VendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    taxa?: boolean
    taxaFechada?: boolean
    dataVenda?: boolean
    createdAt?: boolean
    produtoId?: boolean
    quantidade?: boolean
    valorVenda?: boolean
    precoCompraUsd?: boolean
    formaPagamento?: boolean
    estadoFatura?: boolean
    desconto?: boolean
    produto?: boolean | Venda$produtoArgs<ExtArgs>
  }, ExtArgs["result"]["venda"]>

  export type VendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    taxa?: boolean
    taxaFechada?: boolean
    dataVenda?: boolean
    createdAt?: boolean
    produtoId?: boolean
    quantidade?: boolean
    valorVenda?: boolean
    precoCompraUsd?: boolean
    formaPagamento?: boolean
    estadoFatura?: boolean
    desconto?: boolean
    produto?: boolean | Venda$produtoArgs<ExtArgs>
  }, ExtArgs["result"]["venda"]>

  export type VendaSelectScalar = {
    id?: boolean
    cliente?: boolean
    taxa?: boolean
    taxaFechada?: boolean
    dataVenda?: boolean
    createdAt?: boolean
    produtoId?: boolean
    quantidade?: boolean
    valorVenda?: boolean
    precoCompraUsd?: boolean
    formaPagamento?: boolean
    estadoFatura?: boolean
    desconto?: boolean
  }

  export type VendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cliente" | "taxa" | "taxaFechada" | "dataVenda" | "createdAt" | "produtoId" | "quantidade" | "valorVenda" | "precoCompraUsd" | "formaPagamento" | "estadoFatura" | "desconto", ExtArgs["result"]["venda"]>
  export type VendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | Venda$produtoArgs<ExtArgs>
    itens?: boolean | Venda$itensArgs<ExtArgs>
    pagamentos?: boolean | Venda$pagamentosArgs<ExtArgs>
    _count?: boolean | VendaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | Venda$produtoArgs<ExtArgs>
  }
  export type VendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | Venda$produtoArgs<ExtArgs>
  }

  export type $VendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venda"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs> | null
      itens: Prisma.$VendaItemPayload<ExtArgs>[]
      pagamentos: Prisma.$PagamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cliente: string
      taxa: number | null
      taxaFechada: boolean
      dataVenda: Date
      createdAt: Date
      produtoId: number | null
      quantidade: number | null
      valorVenda: number | null
      precoCompraUsd: number | null
      formaPagamento: string | null
      estadoFatura: string | null
      desconto: number
    }, ExtArgs["result"]["venda"]>
    composites: {}
  }

  type VendaGetPayload<S extends boolean | null | undefined | VendaDefaultArgs> = $Result.GetResult<Prisma.$VendaPayload, S>

  type VendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendaCountAggregateInputType | true
    }

  export interface VendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venda'], meta: { name: 'Venda' } }
    /**
     * Find zero or one Venda that matches the filter.
     * @param {VendaFindUniqueArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendaFindUniqueArgs>(args: SelectSubset<T, VendaFindUniqueArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendaFindUniqueOrThrowArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendaFindUniqueOrThrowArgs>(args: SelectSubset<T, VendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindFirstArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendaFindFirstArgs>(args?: SelectSubset<T, VendaFindFirstArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindFirstOrThrowArgs} args - Arguments to find a Venda
     * @example
     * // Get one Venda
     * const venda = await prisma.venda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendaFindFirstOrThrowArgs>(args?: SelectSubset<T, VendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vendas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendas
     * const vendas = await prisma.venda.findMany()
     * 
     * // Get first 10 Vendas
     * const vendas = await prisma.venda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendaWithIdOnly = await prisma.venda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendaFindManyArgs>(args?: SelectSubset<T, VendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venda.
     * @param {VendaCreateArgs} args - Arguments to create a Venda.
     * @example
     * // Create one Venda
     * const Venda = await prisma.venda.create({
     *   data: {
     *     // ... data to create a Venda
     *   }
     * })
     * 
     */
    create<T extends VendaCreateArgs>(args: SelectSubset<T, VendaCreateArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vendas.
     * @param {VendaCreateManyArgs} args - Arguments to create many Vendas.
     * @example
     * // Create many Vendas
     * const venda = await prisma.venda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendaCreateManyArgs>(args?: SelectSubset<T, VendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendas and returns the data saved in the database.
     * @param {VendaCreateManyAndReturnArgs} args - Arguments to create many Vendas.
     * @example
     * // Create many Vendas
     * const venda = await prisma.venda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendas and only return the `id`
     * const vendaWithIdOnly = await prisma.venda.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendaCreateManyAndReturnArgs>(args?: SelectSubset<T, VendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Venda.
     * @param {VendaDeleteArgs} args - Arguments to delete one Venda.
     * @example
     * // Delete one Venda
     * const Venda = await prisma.venda.delete({
     *   where: {
     *     // ... filter to delete one Venda
     *   }
     * })
     * 
     */
    delete<T extends VendaDeleteArgs>(args: SelectSubset<T, VendaDeleteArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venda.
     * @param {VendaUpdateArgs} args - Arguments to update one Venda.
     * @example
     * // Update one Venda
     * const venda = await prisma.venda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendaUpdateArgs>(args: SelectSubset<T, VendaUpdateArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vendas.
     * @param {VendaDeleteManyArgs} args - Arguments to filter Vendas to delete.
     * @example
     * // Delete a few Vendas
     * const { count } = await prisma.venda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendaDeleteManyArgs>(args?: SelectSubset<T, VendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendas
     * const venda = await prisma.venda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendaUpdateManyArgs>(args: SelectSubset<T, VendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendas and returns the data updated in the database.
     * @param {VendaUpdateManyAndReturnArgs} args - Arguments to update many Vendas.
     * @example
     * // Update many Vendas
     * const venda = await prisma.venda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vendas and only return the `id`
     * const vendaWithIdOnly = await prisma.venda.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendaUpdateManyAndReturnArgs>(args: SelectSubset<T, VendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Venda.
     * @param {VendaUpsertArgs} args - Arguments to update or create a Venda.
     * @example
     * // Update or create a Venda
     * const venda = await prisma.venda.upsert({
     *   create: {
     *     // ... data to create a Venda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venda we want to update
     *   }
     * })
     */
    upsert<T extends VendaUpsertArgs>(args: SelectSubset<T, VendaUpsertArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vendas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaCountArgs} args - Arguments to filter Vendas to count.
     * @example
     * // Count the number of Vendas
     * const count = await prisma.venda.count({
     *   where: {
     *     // ... the filter for the Vendas we want to count
     *   }
     * })
    **/
    count<T extends VendaCountArgs>(
      args?: Subset<T, VendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendaAggregateArgs>(args: Subset<T, VendaAggregateArgs>): Prisma.PrismaPromise<GetVendaAggregateType<T>>

    /**
     * Group by Venda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendaGroupByArgs['orderBy'] }
        : { orderBy?: VendaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venda model
   */
  readonly fields: VendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends Venda$produtoArgs<ExtArgs> = {}>(args?: Subset<T, Venda$produtoArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itens<T extends Venda$itensArgs<ExtArgs> = {}>(args?: Subset<T, Venda$itensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pagamentos<T extends Venda$pagamentosArgs<ExtArgs> = {}>(args?: Subset<T, Venda$pagamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venda model
   */
  interface VendaFieldRefs {
    readonly id: FieldRef<"Venda", 'Int'>
    readonly cliente: FieldRef<"Venda", 'String'>
    readonly taxa: FieldRef<"Venda", 'Float'>
    readonly taxaFechada: FieldRef<"Venda", 'Boolean'>
    readonly dataVenda: FieldRef<"Venda", 'DateTime'>
    readonly createdAt: FieldRef<"Venda", 'DateTime'>
    readonly produtoId: FieldRef<"Venda", 'Int'>
    readonly quantidade: FieldRef<"Venda", 'Int'>
    readonly valorVenda: FieldRef<"Venda", 'Float'>
    readonly precoCompraUsd: FieldRef<"Venda", 'Float'>
    readonly formaPagamento: FieldRef<"Venda", 'String'>
    readonly estadoFatura: FieldRef<"Venda", 'String'>
    readonly desconto: FieldRef<"Venda", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Venda findUnique
   */
  export type VendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda findUniqueOrThrow
   */
  export type VendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda findFirst
   */
  export type VendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendas.
     */
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda findFirstOrThrow
   */
  export type VendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Venda to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendas.
     */
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda findMany
   */
  export type VendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter, which Vendas to fetch.
     */
    where?: VendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendas to fetch.
     */
    orderBy?: VendaOrderByWithRelationInput | VendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendas.
     */
    cursor?: VendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendas.
     */
    skip?: number
    distinct?: VendaScalarFieldEnum | VendaScalarFieldEnum[]
  }

  /**
   * Venda create
   */
  export type VendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Venda.
     */
    data: XOR<VendaCreateInput, VendaUncheckedCreateInput>
  }

  /**
   * Venda createMany
   */
  export type VendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendas.
     */
    data: VendaCreateManyInput | VendaCreateManyInput[]
  }

  /**
   * Venda createManyAndReturn
   */
  export type VendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * The data used to create many Vendas.
     */
    data: VendaCreateManyInput | VendaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venda update
   */
  export type VendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Venda.
     */
    data: XOR<VendaUpdateInput, VendaUncheckedUpdateInput>
    /**
     * Choose, which Venda to update.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda updateMany
   */
  export type VendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendas.
     */
    data: XOR<VendaUpdateManyMutationInput, VendaUncheckedUpdateManyInput>
    /**
     * Filter which Vendas to update
     */
    where?: VendaWhereInput
    /**
     * Limit how many Vendas to update.
     */
    limit?: number
  }

  /**
   * Venda updateManyAndReturn
   */
  export type VendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * The data used to update Vendas.
     */
    data: XOR<VendaUpdateManyMutationInput, VendaUncheckedUpdateManyInput>
    /**
     * Filter which Vendas to update
     */
    where?: VendaWhereInput
    /**
     * Limit how many Vendas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Venda upsert
   */
  export type VendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Venda to update in case it exists.
     */
    where: VendaWhereUniqueInput
    /**
     * In case the Venda found by the `where` argument doesn't exist, create a new Venda with this data.
     */
    create: XOR<VendaCreateInput, VendaUncheckedCreateInput>
    /**
     * In case the Venda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendaUpdateInput, VendaUncheckedUpdateInput>
  }

  /**
   * Venda delete
   */
  export type VendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
    /**
     * Filter which Venda to delete.
     */
    where: VendaWhereUniqueInput
  }

  /**
   * Venda deleteMany
   */
  export type VendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendas to delete
     */
    where?: VendaWhereInput
    /**
     * Limit how many Vendas to delete.
     */
    limit?: number
  }

  /**
   * Venda.produto
   */
  export type Venda$produtoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Produto
     */
    select?: ProdutoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Produto
     */
    omit?: ProdutoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProdutoInclude<ExtArgs> | null
    where?: ProdutoWhereInput
  }

  /**
   * Venda.itens
   */
  export type Venda$itensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    where?: VendaItemWhereInput
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    cursor?: VendaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendaItemScalarFieldEnum | VendaItemScalarFieldEnum[]
  }

  /**
   * Venda.pagamentos
   */
  export type Venda$pagamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    where?: PagamentoWhereInput
    orderBy?: PagamentoOrderByWithRelationInput | PagamentoOrderByWithRelationInput[]
    cursor?: PagamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagamentoScalarFieldEnum | PagamentoScalarFieldEnum[]
  }

  /**
   * Venda without action
   */
  export type VendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venda
     */
    select?: VendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venda
     */
    omit?: VendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaInclude<ExtArgs> | null
  }


  /**
   * Model VendaItem
   */

  export type AggregateVendaItem = {
    _count: VendaItemCountAggregateOutputType | null
    _avg: VendaItemAvgAggregateOutputType | null
    _sum: VendaItemSumAggregateOutputType | null
    _min: VendaItemMinAggregateOutputType | null
    _max: VendaItemMaxAggregateOutputType | null
  }

  export type VendaItemAvgAggregateOutputType = {
    id: number | null
    quantidade: number | null
    valorUnitario: number | null
    total: number | null
    precoCompraUsd: number | null
    custoTotal: number | null
    vendaId: number | null
    produtoId: number | null
  }

  export type VendaItemSumAggregateOutputType = {
    id: number | null
    quantidade: number | null
    valorUnitario: number | null
    total: number | null
    precoCompraUsd: number | null
    custoTotal: number | null
    vendaId: number | null
    produtoId: number | null
  }

  export type VendaItemMinAggregateOutputType = {
    id: number | null
    quantidade: number | null
    valorUnitario: number | null
    total: number | null
    precoCompraUsd: number | null
    custoTotal: number | null
    createdAt: Date | null
    vendaId: number | null
    produtoId: number | null
  }

  export type VendaItemMaxAggregateOutputType = {
    id: number | null
    quantidade: number | null
    valorUnitario: number | null
    total: number | null
    precoCompraUsd: number | null
    custoTotal: number | null
    createdAt: Date | null
    vendaId: number | null
    produtoId: number | null
  }

  export type VendaItemCountAggregateOutputType = {
    id: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd: number
    custoTotal: number
    createdAt: number
    vendaId: number
    produtoId: number
    _all: number
  }


  export type VendaItemAvgAggregateInputType = {
    id?: true
    quantidade?: true
    valorUnitario?: true
    total?: true
    precoCompraUsd?: true
    custoTotal?: true
    vendaId?: true
    produtoId?: true
  }

  export type VendaItemSumAggregateInputType = {
    id?: true
    quantidade?: true
    valorUnitario?: true
    total?: true
    precoCompraUsd?: true
    custoTotal?: true
    vendaId?: true
    produtoId?: true
  }

  export type VendaItemMinAggregateInputType = {
    id?: true
    quantidade?: true
    valorUnitario?: true
    total?: true
    precoCompraUsd?: true
    custoTotal?: true
    createdAt?: true
    vendaId?: true
    produtoId?: true
  }

  export type VendaItemMaxAggregateInputType = {
    id?: true
    quantidade?: true
    valorUnitario?: true
    total?: true
    precoCompraUsd?: true
    custoTotal?: true
    createdAt?: true
    vendaId?: true
    produtoId?: true
  }

  export type VendaItemCountAggregateInputType = {
    id?: true
    quantidade?: true
    valorUnitario?: true
    total?: true
    precoCompraUsd?: true
    custoTotal?: true
    createdAt?: true
    vendaId?: true
    produtoId?: true
    _all?: true
  }

  export type VendaItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendaItem to aggregate.
     */
    where?: VendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendaItems to fetch.
     */
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendaItems
    **/
    _count?: true | VendaItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendaItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendaItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendaItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendaItemMaxAggregateInputType
  }

  export type GetVendaItemAggregateType<T extends VendaItemAggregateArgs> = {
        [P in keyof T & keyof AggregateVendaItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendaItem[P]>
      : GetScalarType<T[P], AggregateVendaItem[P]>
  }




  export type VendaItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendaItemWhereInput
    orderBy?: VendaItemOrderByWithAggregationInput | VendaItemOrderByWithAggregationInput[]
    by: VendaItemScalarFieldEnum[] | VendaItemScalarFieldEnum
    having?: VendaItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendaItemCountAggregateInputType | true
    _avg?: VendaItemAvgAggregateInputType
    _sum?: VendaItemSumAggregateInputType
    _min?: VendaItemMinAggregateInputType
    _max?: VendaItemMaxAggregateInputType
  }

  export type VendaItemGroupByOutputType = {
    id: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd: number | null
    custoTotal: number | null
    createdAt: Date
    vendaId: number
    produtoId: number
    _count: VendaItemCountAggregateOutputType | null
    _avg: VendaItemAvgAggregateOutputType | null
    _sum: VendaItemSumAggregateOutputType | null
    _min: VendaItemMinAggregateOutputType | null
    _max: VendaItemMaxAggregateOutputType | null
  }

  type GetVendaItemGroupByPayload<T extends VendaItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendaItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendaItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendaItemGroupByOutputType[P]>
            : GetScalarType<T[P], VendaItemGroupByOutputType[P]>
        }
      >
    >


  export type VendaItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    total?: boolean
    precoCompraUsd?: boolean
    custoTotal?: boolean
    createdAt?: boolean
    vendaId?: boolean
    produtoId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelhos?: boolean | VendaItem$aparelhosArgs<ExtArgs>
    _count?: boolean | VendaItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendaItem"]>

  export type VendaItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    total?: boolean
    precoCompraUsd?: boolean
    custoTotal?: boolean
    createdAt?: boolean
    vendaId?: boolean
    produtoId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendaItem"]>

  export type VendaItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    total?: boolean
    precoCompraUsd?: boolean
    custoTotal?: boolean
    createdAt?: boolean
    vendaId?: boolean
    produtoId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendaItem"]>

  export type VendaItemSelectScalar = {
    id?: boolean
    quantidade?: boolean
    valorUnitario?: boolean
    total?: boolean
    precoCompraUsd?: boolean
    custoTotal?: boolean
    createdAt?: boolean
    vendaId?: boolean
    produtoId?: boolean
  }

  export type VendaItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantidade" | "valorUnitario" | "total" | "precoCompraUsd" | "custoTotal" | "createdAt" | "vendaId" | "produtoId", ExtArgs["result"]["vendaItem"]>
  export type VendaItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelhos?: boolean | VendaItem$aparelhosArgs<ExtArgs>
    _count?: boolean | VendaItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendaItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type VendaItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $VendaItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendaItem"
    objects: {
      venda: Prisma.$VendaPayload<ExtArgs>
      produto: Prisma.$ProdutoPayload<ExtArgs>
      aparelhos: Prisma.$AparelhoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quantidade: number
      valorUnitario: number
      total: number
      precoCompraUsd: number | null
      custoTotal: number | null
      createdAt: Date
      vendaId: number
      produtoId: number
    }, ExtArgs["result"]["vendaItem"]>
    composites: {}
  }

  type VendaItemGetPayload<S extends boolean | null | undefined | VendaItemDefaultArgs> = $Result.GetResult<Prisma.$VendaItemPayload, S>

  type VendaItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VendaItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VendaItemCountAggregateInputType | true
    }

  export interface VendaItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendaItem'], meta: { name: 'VendaItem' } }
    /**
     * Find zero or one VendaItem that matches the filter.
     * @param {VendaItemFindUniqueArgs} args - Arguments to find a VendaItem
     * @example
     * // Get one VendaItem
     * const vendaItem = await prisma.vendaItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendaItemFindUniqueArgs>(args: SelectSubset<T, VendaItemFindUniqueArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VendaItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VendaItemFindUniqueOrThrowArgs} args - Arguments to find a VendaItem
     * @example
     * // Get one VendaItem
     * const vendaItem = await prisma.vendaItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendaItemFindUniqueOrThrowArgs>(args: SelectSubset<T, VendaItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendaItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemFindFirstArgs} args - Arguments to find a VendaItem
     * @example
     * // Get one VendaItem
     * const vendaItem = await prisma.vendaItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendaItemFindFirstArgs>(args?: SelectSubset<T, VendaItemFindFirstArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VendaItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemFindFirstOrThrowArgs} args - Arguments to find a VendaItem
     * @example
     * // Get one VendaItem
     * const vendaItem = await prisma.vendaItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendaItemFindFirstOrThrowArgs>(args?: SelectSubset<T, VendaItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VendaItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendaItems
     * const vendaItems = await prisma.vendaItem.findMany()
     * 
     * // Get first 10 VendaItems
     * const vendaItems = await prisma.vendaItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendaItemWithIdOnly = await prisma.vendaItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendaItemFindManyArgs>(args?: SelectSubset<T, VendaItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VendaItem.
     * @param {VendaItemCreateArgs} args - Arguments to create a VendaItem.
     * @example
     * // Create one VendaItem
     * const VendaItem = await prisma.vendaItem.create({
     *   data: {
     *     // ... data to create a VendaItem
     *   }
     * })
     * 
     */
    create<T extends VendaItemCreateArgs>(args: SelectSubset<T, VendaItemCreateArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VendaItems.
     * @param {VendaItemCreateManyArgs} args - Arguments to create many VendaItems.
     * @example
     * // Create many VendaItems
     * const vendaItem = await prisma.vendaItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendaItemCreateManyArgs>(args?: SelectSubset<T, VendaItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendaItems and returns the data saved in the database.
     * @param {VendaItemCreateManyAndReturnArgs} args - Arguments to create many VendaItems.
     * @example
     * // Create many VendaItems
     * const vendaItem = await prisma.vendaItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendaItems and only return the `id`
     * const vendaItemWithIdOnly = await prisma.vendaItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendaItemCreateManyAndReturnArgs>(args?: SelectSubset<T, VendaItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VendaItem.
     * @param {VendaItemDeleteArgs} args - Arguments to delete one VendaItem.
     * @example
     * // Delete one VendaItem
     * const VendaItem = await prisma.vendaItem.delete({
     *   where: {
     *     // ... filter to delete one VendaItem
     *   }
     * })
     * 
     */
    delete<T extends VendaItemDeleteArgs>(args: SelectSubset<T, VendaItemDeleteArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VendaItem.
     * @param {VendaItemUpdateArgs} args - Arguments to update one VendaItem.
     * @example
     * // Update one VendaItem
     * const vendaItem = await prisma.vendaItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendaItemUpdateArgs>(args: SelectSubset<T, VendaItemUpdateArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VendaItems.
     * @param {VendaItemDeleteManyArgs} args - Arguments to filter VendaItems to delete.
     * @example
     * // Delete a few VendaItems
     * const { count } = await prisma.vendaItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendaItemDeleteManyArgs>(args?: SelectSubset<T, VendaItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendaItems
     * const vendaItem = await prisma.vendaItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendaItemUpdateManyArgs>(args: SelectSubset<T, VendaItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendaItems and returns the data updated in the database.
     * @param {VendaItemUpdateManyAndReturnArgs} args - Arguments to update many VendaItems.
     * @example
     * // Update many VendaItems
     * const vendaItem = await prisma.vendaItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VendaItems and only return the `id`
     * const vendaItemWithIdOnly = await prisma.vendaItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VendaItemUpdateManyAndReturnArgs>(args: SelectSubset<T, VendaItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VendaItem.
     * @param {VendaItemUpsertArgs} args - Arguments to update or create a VendaItem.
     * @example
     * // Update or create a VendaItem
     * const vendaItem = await prisma.vendaItem.upsert({
     *   create: {
     *     // ... data to create a VendaItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendaItem we want to update
     *   }
     * })
     */
    upsert<T extends VendaItemUpsertArgs>(args: SelectSubset<T, VendaItemUpsertArgs<ExtArgs>>): Prisma__VendaItemClient<$Result.GetResult<Prisma.$VendaItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VendaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemCountArgs} args - Arguments to filter VendaItems to count.
     * @example
     * // Count the number of VendaItems
     * const count = await prisma.vendaItem.count({
     *   where: {
     *     // ... the filter for the VendaItems we want to count
     *   }
     * })
    **/
    count<T extends VendaItemCountArgs>(
      args?: Subset<T, VendaItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendaItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendaItemAggregateArgs>(args: Subset<T, VendaItemAggregateArgs>): Prisma.PrismaPromise<GetVendaItemAggregateType<T>>

    /**
     * Group by VendaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendaItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendaItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendaItemGroupByArgs['orderBy'] }
        : { orderBy?: VendaItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendaItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendaItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendaItem model
   */
  readonly fields: VendaItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendaItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendaItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venda<T extends VendaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendaDefaultArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aparelhos<T extends VendaItem$aparelhosArgs<ExtArgs> = {}>(args?: Subset<T, VendaItem$aparelhosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendaItem model
   */
  interface VendaItemFieldRefs {
    readonly id: FieldRef<"VendaItem", 'Int'>
    readonly quantidade: FieldRef<"VendaItem", 'Int'>
    readonly valorUnitario: FieldRef<"VendaItem", 'Float'>
    readonly total: FieldRef<"VendaItem", 'Float'>
    readonly precoCompraUsd: FieldRef<"VendaItem", 'Float'>
    readonly custoTotal: FieldRef<"VendaItem", 'Float'>
    readonly createdAt: FieldRef<"VendaItem", 'DateTime'>
    readonly vendaId: FieldRef<"VendaItem", 'Int'>
    readonly produtoId: FieldRef<"VendaItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * VendaItem findUnique
   */
  export type VendaItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter, which VendaItem to fetch.
     */
    where: VendaItemWhereUniqueInput
  }

  /**
   * VendaItem findUniqueOrThrow
   */
  export type VendaItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter, which VendaItem to fetch.
     */
    where: VendaItemWhereUniqueInput
  }

  /**
   * VendaItem findFirst
   */
  export type VendaItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter, which VendaItem to fetch.
     */
    where?: VendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendaItems to fetch.
     */
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendaItems.
     */
    cursor?: VendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendaItems.
     */
    distinct?: VendaItemScalarFieldEnum | VendaItemScalarFieldEnum[]
  }

  /**
   * VendaItem findFirstOrThrow
   */
  export type VendaItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter, which VendaItem to fetch.
     */
    where?: VendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendaItems to fetch.
     */
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendaItems.
     */
    cursor?: VendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendaItems.
     */
    distinct?: VendaItemScalarFieldEnum | VendaItemScalarFieldEnum[]
  }

  /**
   * VendaItem findMany
   */
  export type VendaItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter, which VendaItems to fetch.
     */
    where?: VendaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendaItems to fetch.
     */
    orderBy?: VendaItemOrderByWithRelationInput | VendaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendaItems.
     */
    cursor?: VendaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendaItems.
     */
    skip?: number
    distinct?: VendaItemScalarFieldEnum | VendaItemScalarFieldEnum[]
  }

  /**
   * VendaItem create
   */
  export type VendaItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * The data needed to create a VendaItem.
     */
    data: XOR<VendaItemCreateInput, VendaItemUncheckedCreateInput>
  }

  /**
   * VendaItem createMany
   */
  export type VendaItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendaItems.
     */
    data: VendaItemCreateManyInput | VendaItemCreateManyInput[]
  }

  /**
   * VendaItem createManyAndReturn
   */
  export type VendaItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * The data used to create many VendaItems.
     */
    data: VendaItemCreateManyInput | VendaItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendaItem update
   */
  export type VendaItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * The data needed to update a VendaItem.
     */
    data: XOR<VendaItemUpdateInput, VendaItemUncheckedUpdateInput>
    /**
     * Choose, which VendaItem to update.
     */
    where: VendaItemWhereUniqueInput
  }

  /**
   * VendaItem updateMany
   */
  export type VendaItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendaItems.
     */
    data: XOR<VendaItemUpdateManyMutationInput, VendaItemUncheckedUpdateManyInput>
    /**
     * Filter which VendaItems to update
     */
    where?: VendaItemWhereInput
    /**
     * Limit how many VendaItems to update.
     */
    limit?: number
  }

  /**
   * VendaItem updateManyAndReturn
   */
  export type VendaItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * The data used to update VendaItems.
     */
    data: XOR<VendaItemUpdateManyMutationInput, VendaItemUncheckedUpdateManyInput>
    /**
     * Filter which VendaItems to update
     */
    where?: VendaItemWhereInput
    /**
     * Limit how many VendaItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendaItem upsert
   */
  export type VendaItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * The filter to search for the VendaItem to update in case it exists.
     */
    where: VendaItemWhereUniqueInput
    /**
     * In case the VendaItem found by the `where` argument doesn't exist, create a new VendaItem with this data.
     */
    create: XOR<VendaItemCreateInput, VendaItemUncheckedCreateInput>
    /**
     * In case the VendaItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendaItemUpdateInput, VendaItemUncheckedUpdateInput>
  }

  /**
   * VendaItem delete
   */
  export type VendaItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
    /**
     * Filter which VendaItem to delete.
     */
    where: VendaItemWhereUniqueInput
  }

  /**
   * VendaItem deleteMany
   */
  export type VendaItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendaItems to delete
     */
    where?: VendaItemWhereInput
    /**
     * Limit how many VendaItems to delete.
     */
    limit?: number
  }

  /**
   * VendaItem.aparelhos
   */
  export type VendaItem$aparelhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    where?: AparelhoWhereInput
    orderBy?: AparelhoOrderByWithRelationInput | AparelhoOrderByWithRelationInput[]
    cursor?: AparelhoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AparelhoScalarFieldEnum | AparelhoScalarFieldEnum[]
  }

  /**
   * VendaItem without action
   */
  export type VendaItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendaItem
     */
    select?: VendaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VendaItem
     */
    omit?: VendaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendaItemInclude<ExtArgs> | null
  }


  /**
   * Model Pagamento
   */

  export type AggregatePagamento = {
    _count: PagamentoCountAggregateOutputType | null
    _avg: PagamentoAvgAggregateOutputType | null
    _sum: PagamentoSumAggregateOutputType | null
    _min: PagamentoMinAggregateOutputType | null
    _max: PagamentoMaxAggregateOutputType | null
  }

  export type PagamentoAvgAggregateOutputType = {
    id: number | null
    valor: number | null
    desconto: number | null
    vendaId: number | null
  }

  export type PagamentoSumAggregateOutputType = {
    id: number | null
    valor: number | null
    desconto: number | null
    vendaId: number | null
  }

  export type PagamentoMinAggregateOutputType = {
    id: number | null
    valor: number | null
    desconto: number | null
    forma: string | null
    observacao: string | null
    createdAt: Date | null
    vendaId: number | null
  }

  export type PagamentoMaxAggregateOutputType = {
    id: number | null
    valor: number | null
    desconto: number | null
    forma: string | null
    observacao: string | null
    createdAt: Date | null
    vendaId: number | null
  }

  export type PagamentoCountAggregateOutputType = {
    id: number
    valor: number
    desconto: number
    forma: number
    observacao: number
    createdAt: number
    vendaId: number
    _all: number
  }


  export type PagamentoAvgAggregateInputType = {
    id?: true
    valor?: true
    desconto?: true
    vendaId?: true
  }

  export type PagamentoSumAggregateInputType = {
    id?: true
    valor?: true
    desconto?: true
    vendaId?: true
  }

  export type PagamentoMinAggregateInputType = {
    id?: true
    valor?: true
    desconto?: true
    forma?: true
    observacao?: true
    createdAt?: true
    vendaId?: true
  }

  export type PagamentoMaxAggregateInputType = {
    id?: true
    valor?: true
    desconto?: true
    forma?: true
    observacao?: true
    createdAt?: true
    vendaId?: true
  }

  export type PagamentoCountAggregateInputType = {
    id?: true
    valor?: true
    desconto?: true
    forma?: true
    observacao?: true
    createdAt?: true
    vendaId?: true
    _all?: true
  }

  export type PagamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagamento to aggregate.
     */
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     */
    orderBy?: PagamentoOrderByWithRelationInput | PagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagamentos
    **/
    _count?: true | PagamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagamentoMaxAggregateInputType
  }

  export type GetPagamentoAggregateType<T extends PagamentoAggregateArgs> = {
        [P in keyof T & keyof AggregatePagamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePagamento[P]>
      : GetScalarType<T[P], AggregatePagamento[P]>
  }




  export type PagamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagamentoWhereInput
    orderBy?: PagamentoOrderByWithAggregationInput | PagamentoOrderByWithAggregationInput[]
    by: PagamentoScalarFieldEnum[] | PagamentoScalarFieldEnum
    having?: PagamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagamentoCountAggregateInputType | true
    _avg?: PagamentoAvgAggregateInputType
    _sum?: PagamentoSumAggregateInputType
    _min?: PagamentoMinAggregateInputType
    _max?: PagamentoMaxAggregateInputType
  }

  export type PagamentoGroupByOutputType = {
    id: number
    valor: number
    desconto: number
    forma: string | null
    observacao: string | null
    createdAt: Date
    vendaId: number
    _count: PagamentoCountAggregateOutputType | null
    _avg: PagamentoAvgAggregateOutputType | null
    _sum: PagamentoSumAggregateOutputType | null
    _min: PagamentoMinAggregateOutputType | null
    _max: PagamentoMaxAggregateOutputType | null
  }

  type GetPagamentoGroupByPayload<T extends PagamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagamentoGroupByOutputType[P]>
            : GetScalarType<T[P], PagamentoGroupByOutputType[P]>
        }
      >
    >


  export type PagamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valor?: boolean
    desconto?: boolean
    forma?: boolean
    observacao?: boolean
    createdAt?: boolean
    vendaId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagamento"]>

  export type PagamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valor?: boolean
    desconto?: boolean
    forma?: boolean
    observacao?: boolean
    createdAt?: boolean
    vendaId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagamento"]>

  export type PagamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    valor?: boolean
    desconto?: boolean
    forma?: boolean
    observacao?: boolean
    createdAt?: boolean
    vendaId?: boolean
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pagamento"]>

  export type PagamentoSelectScalar = {
    id?: boolean
    valor?: boolean
    desconto?: boolean
    forma?: boolean
    observacao?: boolean
    createdAt?: boolean
    vendaId?: boolean
  }

  export type PagamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "valor" | "desconto" | "forma" | "observacao" | "createdAt" | "vendaId", ExtArgs["result"]["pagamento"]>
  export type PagamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }
  export type PagamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }
  export type PagamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venda?: boolean | VendaDefaultArgs<ExtArgs>
  }

  export type $PagamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pagamento"
    objects: {
      venda: Prisma.$VendaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      valor: number
      desconto: number
      forma: string | null
      observacao: string | null
      createdAt: Date
      vendaId: number
    }, ExtArgs["result"]["pagamento"]>
    composites: {}
  }

  type PagamentoGetPayload<S extends boolean | null | undefined | PagamentoDefaultArgs> = $Result.GetResult<Prisma.$PagamentoPayload, S>

  type PagamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagamentoCountAggregateInputType | true
    }

  export interface PagamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pagamento'], meta: { name: 'Pagamento' } }
    /**
     * Find zero or one Pagamento that matches the filter.
     * @param {PagamentoFindUniqueArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagamentoFindUniqueArgs>(args: SelectSubset<T, PagamentoFindUniqueArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pagamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagamentoFindUniqueOrThrowArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindFirstArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagamentoFindFirstArgs>(args?: SelectSubset<T, PagamentoFindFirstArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pagamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindFirstOrThrowArgs} args - Arguments to find a Pagamento
     * @example
     * // Get one Pagamento
     * const pagamento = await prisma.pagamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagamentos
     * const pagamentos = await prisma.pagamento.findMany()
     * 
     * // Get first 10 Pagamentos
     * const pagamentos = await prisma.pagamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagamentoWithIdOnly = await prisma.pagamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagamentoFindManyArgs>(args?: SelectSubset<T, PagamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pagamento.
     * @param {PagamentoCreateArgs} args - Arguments to create a Pagamento.
     * @example
     * // Create one Pagamento
     * const Pagamento = await prisma.pagamento.create({
     *   data: {
     *     // ... data to create a Pagamento
     *   }
     * })
     * 
     */
    create<T extends PagamentoCreateArgs>(args: SelectSubset<T, PagamentoCreateArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagamentos.
     * @param {PagamentoCreateManyArgs} args - Arguments to create many Pagamentos.
     * @example
     * // Create many Pagamentos
     * const pagamento = await prisma.pagamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagamentoCreateManyArgs>(args?: SelectSubset<T, PagamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagamentos and returns the data saved in the database.
     * @param {PagamentoCreateManyAndReturnArgs} args - Arguments to create many Pagamentos.
     * @example
     * // Create many Pagamentos
     * const pagamento = await prisma.pagamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagamentos and only return the `id`
     * const pagamentoWithIdOnly = await prisma.pagamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pagamento.
     * @param {PagamentoDeleteArgs} args - Arguments to delete one Pagamento.
     * @example
     * // Delete one Pagamento
     * const Pagamento = await prisma.pagamento.delete({
     *   where: {
     *     // ... filter to delete one Pagamento
     *   }
     * })
     * 
     */
    delete<T extends PagamentoDeleteArgs>(args: SelectSubset<T, PagamentoDeleteArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pagamento.
     * @param {PagamentoUpdateArgs} args - Arguments to update one Pagamento.
     * @example
     * // Update one Pagamento
     * const pagamento = await prisma.pagamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagamentoUpdateArgs>(args: SelectSubset<T, PagamentoUpdateArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagamentos.
     * @param {PagamentoDeleteManyArgs} args - Arguments to filter Pagamentos to delete.
     * @example
     * // Delete a few Pagamentos
     * const { count } = await prisma.pagamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagamentoDeleteManyArgs>(args?: SelectSubset<T, PagamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagamentos
     * const pagamento = await prisma.pagamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagamentoUpdateManyArgs>(args: SelectSubset<T, PagamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagamentos and returns the data updated in the database.
     * @param {PagamentoUpdateManyAndReturnArgs} args - Arguments to update many Pagamentos.
     * @example
     * // Update many Pagamentos
     * const pagamento = await prisma.pagamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagamentos and only return the `id`
     * const pagamentoWithIdOnly = await prisma.pagamento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PagamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, PagamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pagamento.
     * @param {PagamentoUpsertArgs} args - Arguments to update or create a Pagamento.
     * @example
     * // Update or create a Pagamento
     * const pagamento = await prisma.pagamento.upsert({
     *   create: {
     *     // ... data to create a Pagamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pagamento we want to update
     *   }
     * })
     */
    upsert<T extends PagamentoUpsertArgs>(args: SelectSubset<T, PagamentoUpsertArgs<ExtArgs>>): Prisma__PagamentoClient<$Result.GetResult<Prisma.$PagamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoCountArgs} args - Arguments to filter Pagamentos to count.
     * @example
     * // Count the number of Pagamentos
     * const count = await prisma.pagamento.count({
     *   where: {
     *     // ... the filter for the Pagamentos we want to count
     *   }
     * })
    **/
    count<T extends PagamentoCountArgs>(
      args?: Subset<T, PagamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagamentoAggregateArgs>(args: Subset<T, PagamentoAggregateArgs>): Prisma.PrismaPromise<GetPagamentoAggregateType<T>>

    /**
     * Group by Pagamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagamentoGroupByArgs['orderBy'] }
        : { orderBy?: PagamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pagamento model
   */
  readonly fields: PagamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pagamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venda<T extends VendaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendaDefaultArgs<ExtArgs>>): Prisma__VendaClient<$Result.GetResult<Prisma.$VendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pagamento model
   */
  interface PagamentoFieldRefs {
    readonly id: FieldRef<"Pagamento", 'Int'>
    readonly valor: FieldRef<"Pagamento", 'Float'>
    readonly desconto: FieldRef<"Pagamento", 'Float'>
    readonly forma: FieldRef<"Pagamento", 'String'>
    readonly observacao: FieldRef<"Pagamento", 'String'>
    readonly createdAt: FieldRef<"Pagamento", 'DateTime'>
    readonly vendaId: FieldRef<"Pagamento", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Pagamento findUnique
   */
  export type PagamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter, which Pagamento to fetch.
     */
    where: PagamentoWhereUniqueInput
  }

  /**
   * Pagamento findUniqueOrThrow
   */
  export type PagamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter, which Pagamento to fetch.
     */
    where: PagamentoWhereUniqueInput
  }

  /**
   * Pagamento findFirst
   */
  export type PagamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter, which Pagamento to fetch.
     */
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     */
    orderBy?: PagamentoOrderByWithRelationInput | PagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagamentos.
     */
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagamentos.
     */
    distinct?: PagamentoScalarFieldEnum | PagamentoScalarFieldEnum[]
  }

  /**
   * Pagamento findFirstOrThrow
   */
  export type PagamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter, which Pagamento to fetch.
     */
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     */
    orderBy?: PagamentoOrderByWithRelationInput | PagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagamentos.
     */
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagamentos.
     */
    distinct?: PagamentoScalarFieldEnum | PagamentoScalarFieldEnum[]
  }

  /**
   * Pagamento findMany
   */
  export type PagamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter, which Pagamentos to fetch.
     */
    where?: PagamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagamentos to fetch.
     */
    orderBy?: PagamentoOrderByWithRelationInput | PagamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagamentos.
     */
    cursor?: PagamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagamentos.
     */
    skip?: number
    distinct?: PagamentoScalarFieldEnum | PagamentoScalarFieldEnum[]
  }

  /**
   * Pagamento create
   */
  export type PagamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pagamento.
     */
    data: XOR<PagamentoCreateInput, PagamentoUncheckedCreateInput>
  }

  /**
   * Pagamento createMany
   */
  export type PagamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagamentos.
     */
    data: PagamentoCreateManyInput | PagamentoCreateManyInput[]
  }

  /**
   * Pagamento createManyAndReturn
   */
  export type PagamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * The data used to create many Pagamentos.
     */
    data: PagamentoCreateManyInput | PagamentoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pagamento update
   */
  export type PagamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pagamento.
     */
    data: XOR<PagamentoUpdateInput, PagamentoUncheckedUpdateInput>
    /**
     * Choose, which Pagamento to update.
     */
    where: PagamentoWhereUniqueInput
  }

  /**
   * Pagamento updateMany
   */
  export type PagamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagamentos.
     */
    data: XOR<PagamentoUpdateManyMutationInput, PagamentoUncheckedUpdateManyInput>
    /**
     * Filter which Pagamentos to update
     */
    where?: PagamentoWhereInput
    /**
     * Limit how many Pagamentos to update.
     */
    limit?: number
  }

  /**
   * Pagamento updateManyAndReturn
   */
  export type PagamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * The data used to update Pagamentos.
     */
    data: XOR<PagamentoUpdateManyMutationInput, PagamentoUncheckedUpdateManyInput>
    /**
     * Filter which Pagamentos to update
     */
    where?: PagamentoWhereInput
    /**
     * Limit how many Pagamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pagamento upsert
   */
  export type PagamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pagamento to update in case it exists.
     */
    where: PagamentoWhereUniqueInput
    /**
     * In case the Pagamento found by the `where` argument doesn't exist, create a new Pagamento with this data.
     */
    create: XOR<PagamentoCreateInput, PagamentoUncheckedCreateInput>
    /**
     * In case the Pagamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagamentoUpdateInput, PagamentoUncheckedUpdateInput>
  }

  /**
   * Pagamento delete
   */
  export type PagamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
    /**
     * Filter which Pagamento to delete.
     */
    where: PagamentoWhereUniqueInput
  }

  /**
   * Pagamento deleteMany
   */
  export type PagamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagamentos to delete
     */
    where?: PagamentoWhereInput
    /**
     * Limit how many Pagamentos to delete.
     */
    limit?: number
  }

  /**
   * Pagamento without action
   */
  export type PagamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pagamento
     */
    select?: PagamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pagamento
     */
    omit?: PagamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagamentoInclude<ExtArgs> | null
  }


  /**
   * Model Garantia
   */

  export type AggregateGarantia = {
    _count: GarantiaCountAggregateOutputType | null
    _avg: GarantiaAvgAggregateOutputType | null
    _sum: GarantiaSumAggregateOutputType | null
    _min: GarantiaMinAggregateOutputType | null
    _max: GarantiaMaxAggregateOutputType | null
  }

  export type GarantiaAvgAggregateOutputType = {
    id: number | null
    produtoId: number | null
  }

  export type GarantiaSumAggregateOutputType = {
    id: number | null
    produtoId: number | null
  }

  export type GarantiaMinAggregateOutputType = {
    id: number | null
    cliente: string | null
    telefone: string | null
    tipo: string | null
    inicio: Date | null
    fim: Date | null
    observacao: string | null
    createdAt: Date | null
    produtoId: number | null
  }

  export type GarantiaMaxAggregateOutputType = {
    id: number | null
    cliente: string | null
    telefone: string | null
    tipo: string | null
    inicio: Date | null
    fim: Date | null
    observacao: string | null
    createdAt: Date | null
    produtoId: number | null
  }

  export type GarantiaCountAggregateOutputType = {
    id: number
    cliente: number
    telefone: number
    tipo: number
    inicio: number
    fim: number
    observacao: number
    createdAt: number
    produtoId: number
    _all: number
  }


  export type GarantiaAvgAggregateInputType = {
    id?: true
    produtoId?: true
  }

  export type GarantiaSumAggregateInputType = {
    id?: true
    produtoId?: true
  }

  export type GarantiaMinAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    tipo?: true
    inicio?: true
    fim?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
  }

  export type GarantiaMaxAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    tipo?: true
    inicio?: true
    fim?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
  }

  export type GarantiaCountAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    tipo?: true
    inicio?: true
    fim?: true
    observacao?: true
    createdAt?: true
    produtoId?: true
    _all?: true
  }

  export type GarantiaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Garantia to aggregate.
     */
    where?: GarantiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Garantias to fetch.
     */
    orderBy?: GarantiaOrderByWithRelationInput | GarantiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GarantiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Garantias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Garantias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Garantias
    **/
    _count?: true | GarantiaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GarantiaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GarantiaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GarantiaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GarantiaMaxAggregateInputType
  }

  export type GetGarantiaAggregateType<T extends GarantiaAggregateArgs> = {
        [P in keyof T & keyof AggregateGarantia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGarantia[P]>
      : GetScalarType<T[P], AggregateGarantia[P]>
  }




  export type GarantiaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GarantiaWhereInput
    orderBy?: GarantiaOrderByWithAggregationInput | GarantiaOrderByWithAggregationInput[]
    by: GarantiaScalarFieldEnum[] | GarantiaScalarFieldEnum
    having?: GarantiaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GarantiaCountAggregateInputType | true
    _avg?: GarantiaAvgAggregateInputType
    _sum?: GarantiaSumAggregateInputType
    _min?: GarantiaMinAggregateInputType
    _max?: GarantiaMaxAggregateInputType
  }

  export type GarantiaGroupByOutputType = {
    id: number
    cliente: string
    telefone: string | null
    tipo: string
    inicio: Date
    fim: Date
    observacao: string | null
    createdAt: Date
    produtoId: number
    _count: GarantiaCountAggregateOutputType | null
    _avg: GarantiaAvgAggregateOutputType | null
    _sum: GarantiaSumAggregateOutputType | null
    _min: GarantiaMinAggregateOutputType | null
    _max: GarantiaMaxAggregateOutputType | null
  }

  type GetGarantiaGroupByPayload<T extends GarantiaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GarantiaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GarantiaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GarantiaGroupByOutputType[P]>
            : GetScalarType<T[P], GarantiaGroupByOutputType[P]>
        }
      >
    >


  export type GarantiaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    tipo?: boolean
    inicio?: boolean
    fim?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["garantia"]>

  export type GarantiaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    tipo?: boolean
    inicio?: boolean
    fim?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["garantia"]>

  export type GarantiaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    tipo?: boolean
    inicio?: boolean
    fim?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["garantia"]>

  export type GarantiaSelectScalar = {
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    tipo?: boolean
    inicio?: boolean
    fim?: boolean
    observacao?: boolean
    createdAt?: boolean
    produtoId?: boolean
  }

  export type GarantiaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cliente" | "telefone" | "tipo" | "inicio" | "fim" | "observacao" | "createdAt" | "produtoId", ExtArgs["result"]["garantia"]>
  export type GarantiaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type GarantiaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }
  export type GarantiaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
  }

  export type $GarantiaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Garantia"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cliente: string
      telefone: string | null
      tipo: string
      inicio: Date
      fim: Date
      observacao: string | null
      createdAt: Date
      produtoId: number
    }, ExtArgs["result"]["garantia"]>
    composites: {}
  }

  type GarantiaGetPayload<S extends boolean | null | undefined | GarantiaDefaultArgs> = $Result.GetResult<Prisma.$GarantiaPayload, S>

  type GarantiaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GarantiaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GarantiaCountAggregateInputType | true
    }

  export interface GarantiaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Garantia'], meta: { name: 'Garantia' } }
    /**
     * Find zero or one Garantia that matches the filter.
     * @param {GarantiaFindUniqueArgs} args - Arguments to find a Garantia
     * @example
     * // Get one Garantia
     * const garantia = await prisma.garantia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GarantiaFindUniqueArgs>(args: SelectSubset<T, GarantiaFindUniqueArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Garantia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GarantiaFindUniqueOrThrowArgs} args - Arguments to find a Garantia
     * @example
     * // Get one Garantia
     * const garantia = await prisma.garantia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GarantiaFindUniqueOrThrowArgs>(args: SelectSubset<T, GarantiaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Garantia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaFindFirstArgs} args - Arguments to find a Garantia
     * @example
     * // Get one Garantia
     * const garantia = await prisma.garantia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GarantiaFindFirstArgs>(args?: SelectSubset<T, GarantiaFindFirstArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Garantia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaFindFirstOrThrowArgs} args - Arguments to find a Garantia
     * @example
     * // Get one Garantia
     * const garantia = await prisma.garantia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GarantiaFindFirstOrThrowArgs>(args?: SelectSubset<T, GarantiaFindFirstOrThrowArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Garantias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Garantias
     * const garantias = await prisma.garantia.findMany()
     * 
     * // Get first 10 Garantias
     * const garantias = await prisma.garantia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const garantiaWithIdOnly = await prisma.garantia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GarantiaFindManyArgs>(args?: SelectSubset<T, GarantiaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Garantia.
     * @param {GarantiaCreateArgs} args - Arguments to create a Garantia.
     * @example
     * // Create one Garantia
     * const Garantia = await prisma.garantia.create({
     *   data: {
     *     // ... data to create a Garantia
     *   }
     * })
     * 
     */
    create<T extends GarantiaCreateArgs>(args: SelectSubset<T, GarantiaCreateArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Garantias.
     * @param {GarantiaCreateManyArgs} args - Arguments to create many Garantias.
     * @example
     * // Create many Garantias
     * const garantia = await prisma.garantia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GarantiaCreateManyArgs>(args?: SelectSubset<T, GarantiaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Garantias and returns the data saved in the database.
     * @param {GarantiaCreateManyAndReturnArgs} args - Arguments to create many Garantias.
     * @example
     * // Create many Garantias
     * const garantia = await prisma.garantia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Garantias and only return the `id`
     * const garantiaWithIdOnly = await prisma.garantia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GarantiaCreateManyAndReturnArgs>(args?: SelectSubset<T, GarantiaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Garantia.
     * @param {GarantiaDeleteArgs} args - Arguments to delete one Garantia.
     * @example
     * // Delete one Garantia
     * const Garantia = await prisma.garantia.delete({
     *   where: {
     *     // ... filter to delete one Garantia
     *   }
     * })
     * 
     */
    delete<T extends GarantiaDeleteArgs>(args: SelectSubset<T, GarantiaDeleteArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Garantia.
     * @param {GarantiaUpdateArgs} args - Arguments to update one Garantia.
     * @example
     * // Update one Garantia
     * const garantia = await prisma.garantia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GarantiaUpdateArgs>(args: SelectSubset<T, GarantiaUpdateArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Garantias.
     * @param {GarantiaDeleteManyArgs} args - Arguments to filter Garantias to delete.
     * @example
     * // Delete a few Garantias
     * const { count } = await prisma.garantia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GarantiaDeleteManyArgs>(args?: SelectSubset<T, GarantiaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Garantias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Garantias
     * const garantia = await prisma.garantia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GarantiaUpdateManyArgs>(args: SelectSubset<T, GarantiaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Garantias and returns the data updated in the database.
     * @param {GarantiaUpdateManyAndReturnArgs} args - Arguments to update many Garantias.
     * @example
     * // Update many Garantias
     * const garantia = await prisma.garantia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Garantias and only return the `id`
     * const garantiaWithIdOnly = await prisma.garantia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GarantiaUpdateManyAndReturnArgs>(args: SelectSubset<T, GarantiaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Garantia.
     * @param {GarantiaUpsertArgs} args - Arguments to update or create a Garantia.
     * @example
     * // Update or create a Garantia
     * const garantia = await prisma.garantia.upsert({
     *   create: {
     *     // ... data to create a Garantia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Garantia we want to update
     *   }
     * })
     */
    upsert<T extends GarantiaUpsertArgs>(args: SelectSubset<T, GarantiaUpsertArgs<ExtArgs>>): Prisma__GarantiaClient<$Result.GetResult<Prisma.$GarantiaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Garantias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaCountArgs} args - Arguments to filter Garantias to count.
     * @example
     * // Count the number of Garantias
     * const count = await prisma.garantia.count({
     *   where: {
     *     // ... the filter for the Garantias we want to count
     *   }
     * })
    **/
    count<T extends GarantiaCountArgs>(
      args?: Subset<T, GarantiaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GarantiaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Garantia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GarantiaAggregateArgs>(args: Subset<T, GarantiaAggregateArgs>): Prisma.PrismaPromise<GetGarantiaAggregateType<T>>

    /**
     * Group by Garantia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GarantiaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GarantiaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GarantiaGroupByArgs['orderBy'] }
        : { orderBy?: GarantiaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GarantiaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGarantiaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Garantia model
   */
  readonly fields: GarantiaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Garantia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GarantiaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Garantia model
   */
  interface GarantiaFieldRefs {
    readonly id: FieldRef<"Garantia", 'Int'>
    readonly cliente: FieldRef<"Garantia", 'String'>
    readonly telefone: FieldRef<"Garantia", 'String'>
    readonly tipo: FieldRef<"Garantia", 'String'>
    readonly inicio: FieldRef<"Garantia", 'DateTime'>
    readonly fim: FieldRef<"Garantia", 'DateTime'>
    readonly observacao: FieldRef<"Garantia", 'String'>
    readonly createdAt: FieldRef<"Garantia", 'DateTime'>
    readonly produtoId: FieldRef<"Garantia", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Garantia findUnique
   */
  export type GarantiaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter, which Garantia to fetch.
     */
    where: GarantiaWhereUniqueInput
  }

  /**
   * Garantia findUniqueOrThrow
   */
  export type GarantiaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter, which Garantia to fetch.
     */
    where: GarantiaWhereUniqueInput
  }

  /**
   * Garantia findFirst
   */
  export type GarantiaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter, which Garantia to fetch.
     */
    where?: GarantiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Garantias to fetch.
     */
    orderBy?: GarantiaOrderByWithRelationInput | GarantiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Garantias.
     */
    cursor?: GarantiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Garantias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Garantias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Garantias.
     */
    distinct?: GarantiaScalarFieldEnum | GarantiaScalarFieldEnum[]
  }

  /**
   * Garantia findFirstOrThrow
   */
  export type GarantiaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter, which Garantia to fetch.
     */
    where?: GarantiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Garantias to fetch.
     */
    orderBy?: GarantiaOrderByWithRelationInput | GarantiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Garantias.
     */
    cursor?: GarantiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Garantias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Garantias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Garantias.
     */
    distinct?: GarantiaScalarFieldEnum | GarantiaScalarFieldEnum[]
  }

  /**
   * Garantia findMany
   */
  export type GarantiaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter, which Garantias to fetch.
     */
    where?: GarantiaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Garantias to fetch.
     */
    orderBy?: GarantiaOrderByWithRelationInput | GarantiaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Garantias.
     */
    cursor?: GarantiaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Garantias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Garantias.
     */
    skip?: number
    distinct?: GarantiaScalarFieldEnum | GarantiaScalarFieldEnum[]
  }

  /**
   * Garantia create
   */
  export type GarantiaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * The data needed to create a Garantia.
     */
    data: XOR<GarantiaCreateInput, GarantiaUncheckedCreateInput>
  }

  /**
   * Garantia createMany
   */
  export type GarantiaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Garantias.
     */
    data: GarantiaCreateManyInput | GarantiaCreateManyInput[]
  }

  /**
   * Garantia createManyAndReturn
   */
  export type GarantiaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * The data used to create many Garantias.
     */
    data: GarantiaCreateManyInput | GarantiaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Garantia update
   */
  export type GarantiaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * The data needed to update a Garantia.
     */
    data: XOR<GarantiaUpdateInput, GarantiaUncheckedUpdateInput>
    /**
     * Choose, which Garantia to update.
     */
    where: GarantiaWhereUniqueInput
  }

  /**
   * Garantia updateMany
   */
  export type GarantiaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Garantias.
     */
    data: XOR<GarantiaUpdateManyMutationInput, GarantiaUncheckedUpdateManyInput>
    /**
     * Filter which Garantias to update
     */
    where?: GarantiaWhereInput
    /**
     * Limit how many Garantias to update.
     */
    limit?: number
  }

  /**
   * Garantia updateManyAndReturn
   */
  export type GarantiaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * The data used to update Garantias.
     */
    data: XOR<GarantiaUpdateManyMutationInput, GarantiaUncheckedUpdateManyInput>
    /**
     * Filter which Garantias to update
     */
    where?: GarantiaWhereInput
    /**
     * Limit how many Garantias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Garantia upsert
   */
  export type GarantiaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * The filter to search for the Garantia to update in case it exists.
     */
    where: GarantiaWhereUniqueInput
    /**
     * In case the Garantia found by the `where` argument doesn't exist, create a new Garantia with this data.
     */
    create: XOR<GarantiaCreateInput, GarantiaUncheckedCreateInput>
    /**
     * In case the Garantia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GarantiaUpdateInput, GarantiaUncheckedUpdateInput>
  }

  /**
   * Garantia delete
   */
  export type GarantiaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
    /**
     * Filter which Garantia to delete.
     */
    where: GarantiaWhereUniqueInput
  }

  /**
   * Garantia deleteMany
   */
  export type GarantiaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Garantias to delete
     */
    where?: GarantiaWhereInput
    /**
     * Limit how many Garantias to delete.
     */
    limit?: number
  }

  /**
   * Garantia without action
   */
  export type GarantiaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Garantia
     */
    select?: GarantiaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Garantia
     */
    omit?: GarantiaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GarantiaInclude<ExtArgs> | null
  }


  /**
   * Model Assistencia
   */

  export type AggregateAssistencia = {
    _count: AssistenciaCountAggregateOutputType | null
    _avg: AssistenciaAvgAggregateOutputType | null
    _sum: AssistenciaSumAggregateOutputType | null
    _min: AssistenciaMinAggregateOutputType | null
    _max: AssistenciaMaxAggregateOutputType | null
  }

  export type AssistenciaAvgAggregateOutputType = {
    id: number | null
    custo: number | null
    produtoId: number | null
    aparelhoId: number | null
  }

  export type AssistenciaSumAggregateOutputType = {
    id: number | null
    custo: number | null
    produtoId: number | null
    aparelhoId: number | null
  }

  export type AssistenciaMinAggregateOutputType = {
    id: number | null
    cliente: string | null
    telefone: string | null
    problema: string | null
    observacao: string | null
    status: string | null
    custo: number | null
    dataEntrada: Date | null
    dataSaida: Date | null
    createdAt: Date | null
    produtoId: number | null
    aparelhoId: number | null
  }

  export type AssistenciaMaxAggregateOutputType = {
    id: number | null
    cliente: string | null
    telefone: string | null
    problema: string | null
    observacao: string | null
    status: string | null
    custo: number | null
    dataEntrada: Date | null
    dataSaida: Date | null
    createdAt: Date | null
    produtoId: number | null
    aparelhoId: number | null
  }

  export type AssistenciaCountAggregateOutputType = {
    id: number
    cliente: number
    telefone: number
    problema: number
    observacao: number
    status: number
    custo: number
    dataEntrada: number
    dataSaida: number
    createdAt: number
    produtoId: number
    aparelhoId: number
    _all: number
  }


  export type AssistenciaAvgAggregateInputType = {
    id?: true
    custo?: true
    produtoId?: true
    aparelhoId?: true
  }

  export type AssistenciaSumAggregateInputType = {
    id?: true
    custo?: true
    produtoId?: true
    aparelhoId?: true
  }

  export type AssistenciaMinAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    problema?: true
    observacao?: true
    status?: true
    custo?: true
    dataEntrada?: true
    dataSaida?: true
    createdAt?: true
    produtoId?: true
    aparelhoId?: true
  }

  export type AssistenciaMaxAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    problema?: true
    observacao?: true
    status?: true
    custo?: true
    dataEntrada?: true
    dataSaida?: true
    createdAt?: true
    produtoId?: true
    aparelhoId?: true
  }

  export type AssistenciaCountAggregateInputType = {
    id?: true
    cliente?: true
    telefone?: true
    problema?: true
    observacao?: true
    status?: true
    custo?: true
    dataEntrada?: true
    dataSaida?: true
    createdAt?: true
    produtoId?: true
    aparelhoId?: true
    _all?: true
  }

  export type AssistenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistencia to aggregate.
     */
    where?: AssistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistencias to fetch.
     */
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assistencias
    **/
    _count?: true | AssistenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssistenciaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssistenciaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssistenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssistenciaMaxAggregateInputType
  }

  export type GetAssistenciaAggregateType<T extends AssistenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateAssistencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssistencia[P]>
      : GetScalarType<T[P], AggregateAssistencia[P]>
  }




  export type AssistenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssistenciaWhereInput
    orderBy?: AssistenciaOrderByWithAggregationInput | AssistenciaOrderByWithAggregationInput[]
    by: AssistenciaScalarFieldEnum[] | AssistenciaScalarFieldEnum
    having?: AssistenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssistenciaCountAggregateInputType | true
    _avg?: AssistenciaAvgAggregateInputType
    _sum?: AssistenciaSumAggregateInputType
    _min?: AssistenciaMinAggregateInputType
    _max?: AssistenciaMaxAggregateInputType
  }

  export type AssistenciaGroupByOutputType = {
    id: number
    cliente: string
    telefone: string | null
    problema: string
    observacao: string | null
    status: string
    custo: number
    dataEntrada: Date
    dataSaida: Date | null
    createdAt: Date
    produtoId: number
    aparelhoId: number | null
    _count: AssistenciaCountAggregateOutputType | null
    _avg: AssistenciaAvgAggregateOutputType | null
    _sum: AssistenciaSumAggregateOutputType | null
    _min: AssistenciaMinAggregateOutputType | null
    _max: AssistenciaMaxAggregateOutputType | null
  }

  type GetAssistenciaGroupByPayload<T extends AssistenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssistenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssistenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssistenciaGroupByOutputType[P]>
            : GetScalarType<T[P], AssistenciaGroupByOutputType[P]>
        }
      >
    >


  export type AssistenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    problema?: boolean
    observacao?: boolean
    status?: boolean
    custo?: boolean
    dataEntrada?: boolean
    dataSaida?: boolean
    createdAt?: boolean
    produtoId?: boolean
    aparelhoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }, ExtArgs["result"]["assistencia"]>

  export type AssistenciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    problema?: boolean
    observacao?: boolean
    status?: boolean
    custo?: boolean
    dataEntrada?: boolean
    dataSaida?: boolean
    createdAt?: boolean
    produtoId?: boolean
    aparelhoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }, ExtArgs["result"]["assistencia"]>

  export type AssistenciaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    problema?: boolean
    observacao?: boolean
    status?: boolean
    custo?: boolean
    dataEntrada?: boolean
    dataSaida?: boolean
    createdAt?: boolean
    produtoId?: boolean
    aparelhoId?: boolean
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }, ExtArgs["result"]["assistencia"]>

  export type AssistenciaSelectScalar = {
    id?: boolean
    cliente?: boolean
    telefone?: boolean
    problema?: boolean
    observacao?: boolean
    status?: boolean
    custo?: boolean
    dataEntrada?: boolean
    dataSaida?: boolean
    createdAt?: boolean
    produtoId?: boolean
    aparelhoId?: boolean
  }

  export type AssistenciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cliente" | "telefone" | "problema" | "observacao" | "status" | "custo" | "dataEntrada" | "dataSaida" | "createdAt" | "produtoId" | "aparelhoId", ExtArgs["result"]["assistencia"]>
  export type AssistenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }
  export type AssistenciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }
  export type AssistenciaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    produto?: boolean | ProdutoDefaultArgs<ExtArgs>
    aparelho?: boolean | Assistencia$aparelhoArgs<ExtArgs>
  }

  export type $AssistenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assistencia"
    objects: {
      produto: Prisma.$ProdutoPayload<ExtArgs>
      aparelho: Prisma.$AparelhoPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cliente: string
      telefone: string | null
      problema: string
      observacao: string | null
      status: string
      custo: number
      dataEntrada: Date
      dataSaida: Date | null
      createdAt: Date
      produtoId: number
      aparelhoId: number | null
    }, ExtArgs["result"]["assistencia"]>
    composites: {}
  }

  type AssistenciaGetPayload<S extends boolean | null | undefined | AssistenciaDefaultArgs> = $Result.GetResult<Prisma.$AssistenciaPayload, S>

  type AssistenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssistenciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssistenciaCountAggregateInputType | true
    }

  export interface AssistenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assistencia'], meta: { name: 'Assistencia' } }
    /**
     * Find zero or one Assistencia that matches the filter.
     * @param {AssistenciaFindUniqueArgs} args - Arguments to find a Assistencia
     * @example
     * // Get one Assistencia
     * const assistencia = await prisma.assistencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssistenciaFindUniqueArgs>(args: SelectSubset<T, AssistenciaFindUniqueArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assistencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssistenciaFindUniqueOrThrowArgs} args - Arguments to find a Assistencia
     * @example
     * // Get one Assistencia
     * const assistencia = await prisma.assistencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssistenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, AssistenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assistencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaFindFirstArgs} args - Arguments to find a Assistencia
     * @example
     * // Get one Assistencia
     * const assistencia = await prisma.assistencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssistenciaFindFirstArgs>(args?: SelectSubset<T, AssistenciaFindFirstArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assistencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaFindFirstOrThrowArgs} args - Arguments to find a Assistencia
     * @example
     * // Get one Assistencia
     * const assistencia = await prisma.assistencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssistenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, AssistenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assistencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assistencias
     * const assistencias = await prisma.assistencia.findMany()
     * 
     * // Get first 10 Assistencias
     * const assistencias = await prisma.assistencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assistenciaWithIdOnly = await prisma.assistencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssistenciaFindManyArgs>(args?: SelectSubset<T, AssistenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assistencia.
     * @param {AssistenciaCreateArgs} args - Arguments to create a Assistencia.
     * @example
     * // Create one Assistencia
     * const Assistencia = await prisma.assistencia.create({
     *   data: {
     *     // ... data to create a Assistencia
     *   }
     * })
     * 
     */
    create<T extends AssistenciaCreateArgs>(args: SelectSubset<T, AssistenciaCreateArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assistencias.
     * @param {AssistenciaCreateManyArgs} args - Arguments to create many Assistencias.
     * @example
     * // Create many Assistencias
     * const assistencia = await prisma.assistencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssistenciaCreateManyArgs>(args?: SelectSubset<T, AssistenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assistencias and returns the data saved in the database.
     * @param {AssistenciaCreateManyAndReturnArgs} args - Arguments to create many Assistencias.
     * @example
     * // Create many Assistencias
     * const assistencia = await prisma.assistencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assistencias and only return the `id`
     * const assistenciaWithIdOnly = await prisma.assistencia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssistenciaCreateManyAndReturnArgs>(args?: SelectSubset<T, AssistenciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assistencia.
     * @param {AssistenciaDeleteArgs} args - Arguments to delete one Assistencia.
     * @example
     * // Delete one Assistencia
     * const Assistencia = await prisma.assistencia.delete({
     *   where: {
     *     // ... filter to delete one Assistencia
     *   }
     * })
     * 
     */
    delete<T extends AssistenciaDeleteArgs>(args: SelectSubset<T, AssistenciaDeleteArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assistencia.
     * @param {AssistenciaUpdateArgs} args - Arguments to update one Assistencia.
     * @example
     * // Update one Assistencia
     * const assistencia = await prisma.assistencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssistenciaUpdateArgs>(args: SelectSubset<T, AssistenciaUpdateArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assistencias.
     * @param {AssistenciaDeleteManyArgs} args - Arguments to filter Assistencias to delete.
     * @example
     * // Delete a few Assistencias
     * const { count } = await prisma.assistencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssistenciaDeleteManyArgs>(args?: SelectSubset<T, AssistenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assistencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assistencias
     * const assistencia = await prisma.assistencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssistenciaUpdateManyArgs>(args: SelectSubset<T, AssistenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assistencias and returns the data updated in the database.
     * @param {AssistenciaUpdateManyAndReturnArgs} args - Arguments to update many Assistencias.
     * @example
     * // Update many Assistencias
     * const assistencia = await prisma.assistencia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assistencias and only return the `id`
     * const assistenciaWithIdOnly = await prisma.assistencia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssistenciaUpdateManyAndReturnArgs>(args: SelectSubset<T, AssistenciaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assistencia.
     * @param {AssistenciaUpsertArgs} args - Arguments to update or create a Assistencia.
     * @example
     * // Update or create a Assistencia
     * const assistencia = await prisma.assistencia.upsert({
     *   create: {
     *     // ... data to create a Assistencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assistencia we want to update
     *   }
     * })
     */
    upsert<T extends AssistenciaUpsertArgs>(args: SelectSubset<T, AssistenciaUpsertArgs<ExtArgs>>): Prisma__AssistenciaClient<$Result.GetResult<Prisma.$AssistenciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assistencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaCountArgs} args - Arguments to filter Assistencias to count.
     * @example
     * // Count the number of Assistencias
     * const count = await prisma.assistencia.count({
     *   where: {
     *     // ... the filter for the Assistencias we want to count
     *   }
     * })
    **/
    count<T extends AssistenciaCountArgs>(
      args?: Subset<T, AssistenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssistenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assistencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssistenciaAggregateArgs>(args: Subset<T, AssistenciaAggregateArgs>): Prisma.PrismaPromise<GetAssistenciaAggregateType<T>>

    /**
     * Group by Assistencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssistenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssistenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssistenciaGroupByArgs['orderBy'] }
        : { orderBy?: AssistenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssistenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssistenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assistencia model
   */
  readonly fields: AssistenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assistencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssistenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    produto<T extends ProdutoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProdutoDefaultArgs<ExtArgs>>): Prisma__ProdutoClient<$Result.GetResult<Prisma.$ProdutoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aparelho<T extends Assistencia$aparelhoArgs<ExtArgs> = {}>(args?: Subset<T, Assistencia$aparelhoArgs<ExtArgs>>): Prisma__AparelhoClient<$Result.GetResult<Prisma.$AparelhoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assistencia model
   */
  interface AssistenciaFieldRefs {
    readonly id: FieldRef<"Assistencia", 'Int'>
    readonly cliente: FieldRef<"Assistencia", 'String'>
    readonly telefone: FieldRef<"Assistencia", 'String'>
    readonly problema: FieldRef<"Assistencia", 'String'>
    readonly observacao: FieldRef<"Assistencia", 'String'>
    readonly status: FieldRef<"Assistencia", 'String'>
    readonly custo: FieldRef<"Assistencia", 'Float'>
    readonly dataEntrada: FieldRef<"Assistencia", 'DateTime'>
    readonly dataSaida: FieldRef<"Assistencia", 'DateTime'>
    readonly createdAt: FieldRef<"Assistencia", 'DateTime'>
    readonly produtoId: FieldRef<"Assistencia", 'Int'>
    readonly aparelhoId: FieldRef<"Assistencia", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Assistencia findUnique
   */
  export type AssistenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Assistencia to fetch.
     */
    where: AssistenciaWhereUniqueInput
  }

  /**
   * Assistencia findUniqueOrThrow
   */
  export type AssistenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Assistencia to fetch.
     */
    where: AssistenciaWhereUniqueInput
  }

  /**
   * Assistencia findFirst
   */
  export type AssistenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Assistencia to fetch.
     */
    where?: AssistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistencias to fetch.
     */
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistencias.
     */
    cursor?: AssistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistencias.
     */
    distinct?: AssistenciaScalarFieldEnum | AssistenciaScalarFieldEnum[]
  }

  /**
   * Assistencia findFirstOrThrow
   */
  export type AssistenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Assistencia to fetch.
     */
    where?: AssistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistencias to fetch.
     */
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assistencias.
     */
    cursor?: AssistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assistencias.
     */
    distinct?: AssistenciaScalarFieldEnum | AssistenciaScalarFieldEnum[]
  }

  /**
   * Assistencia findMany
   */
  export type AssistenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter, which Assistencias to fetch.
     */
    where?: AssistenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assistencias to fetch.
     */
    orderBy?: AssistenciaOrderByWithRelationInput | AssistenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assistencias.
     */
    cursor?: AssistenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assistencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assistencias.
     */
    skip?: number
    distinct?: AssistenciaScalarFieldEnum | AssistenciaScalarFieldEnum[]
  }

  /**
   * Assistencia create
   */
  export type AssistenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Assistencia.
     */
    data: XOR<AssistenciaCreateInput, AssistenciaUncheckedCreateInput>
  }

  /**
   * Assistencia createMany
   */
  export type AssistenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assistencias.
     */
    data: AssistenciaCreateManyInput | AssistenciaCreateManyInput[]
  }

  /**
   * Assistencia createManyAndReturn
   */
  export type AssistenciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * The data used to create many Assistencias.
     */
    data: AssistenciaCreateManyInput | AssistenciaCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assistencia update
   */
  export type AssistenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Assistencia.
     */
    data: XOR<AssistenciaUpdateInput, AssistenciaUncheckedUpdateInput>
    /**
     * Choose, which Assistencia to update.
     */
    where: AssistenciaWhereUniqueInput
  }

  /**
   * Assistencia updateMany
   */
  export type AssistenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assistencias.
     */
    data: XOR<AssistenciaUpdateManyMutationInput, AssistenciaUncheckedUpdateManyInput>
    /**
     * Filter which Assistencias to update
     */
    where?: AssistenciaWhereInput
    /**
     * Limit how many Assistencias to update.
     */
    limit?: number
  }

  /**
   * Assistencia updateManyAndReturn
   */
  export type AssistenciaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * The data used to update Assistencias.
     */
    data: XOR<AssistenciaUpdateManyMutationInput, AssistenciaUncheckedUpdateManyInput>
    /**
     * Filter which Assistencias to update
     */
    where?: AssistenciaWhereInput
    /**
     * Limit how many Assistencias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assistencia upsert
   */
  export type AssistenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Assistencia to update in case it exists.
     */
    where: AssistenciaWhereUniqueInput
    /**
     * In case the Assistencia found by the `where` argument doesn't exist, create a new Assistencia with this data.
     */
    create: XOR<AssistenciaCreateInput, AssistenciaUncheckedCreateInput>
    /**
     * In case the Assistencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssistenciaUpdateInput, AssistenciaUncheckedUpdateInput>
  }

  /**
   * Assistencia delete
   */
  export type AssistenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
    /**
     * Filter which Assistencia to delete.
     */
    where: AssistenciaWhereUniqueInput
  }

  /**
   * Assistencia deleteMany
   */
  export type AssistenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assistencias to delete
     */
    where?: AssistenciaWhereInput
    /**
     * Limit how many Assistencias to delete.
     */
    limit?: number
  }

  /**
   * Assistencia.aparelho
   */
  export type Assistencia$aparelhoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aparelho
     */
    select?: AparelhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aparelho
     */
    omit?: AparelhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AparelhoInclude<ExtArgs> | null
    where?: AparelhoWhereInput
  }

  /**
   * Assistencia without action
   */
  export type AssistenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assistencia
     */
    select?: AssistenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assistencia
     */
    omit?: AssistenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssistenciaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role',
    ativo: 'ativo',
    resetCode: 'resetCode',
    resetCodeExpiresAt: 'resetCodeExpiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ProdutoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    quantidade: 'quantidade',
    createdAt: 'createdAt',
    precoVendaUsd: 'precoVendaUsd',
    precoVendaBrl: 'precoVendaBrl',
    tipoPreco: 'tipoPreco'
  };

  export type ProdutoScalarFieldEnum = (typeof ProdutoScalarFieldEnum)[keyof typeof ProdutoScalarFieldEnum]


  export const LoteScalarFieldEnum: {
    id: 'id',
    fornecedor: 'fornecedor',
    precoCompraUsd: 'precoCompraUsd',
    precoCompraBrl: 'precoCompraBrl',
    tipoCusto: 'tipoCusto',
    quantidade: 'quantidade',
    observacao: 'observacao',
    createdAt: 'createdAt',
    produtoId: 'produtoId'
  };

  export type LoteScalarFieldEnum = (typeof LoteScalarFieldEnum)[keyof typeof LoteScalarFieldEnum]


  export const AparelhoScalarFieldEnum: {
    id: 'id',
    imei: 'imei',
    vendido: 'vendido',
    createdAt: 'createdAt',
    loteId: 'loteId',
    produtoId: 'produtoId',
    vendaItemId: 'vendaItemId'
  };

  export type AparelhoScalarFieldEnum = (typeof AparelhoScalarFieldEnum)[keyof typeof AparelhoScalarFieldEnum]


  export const VendaScalarFieldEnum: {
    id: 'id',
    cliente: 'cliente',
    taxa: 'taxa',
    taxaFechada: 'taxaFechada',
    dataVenda: 'dataVenda',
    createdAt: 'createdAt',
    produtoId: 'produtoId',
    quantidade: 'quantidade',
    valorVenda: 'valorVenda',
    precoCompraUsd: 'precoCompraUsd',
    formaPagamento: 'formaPagamento',
    estadoFatura: 'estadoFatura',
    desconto: 'desconto'
  };

  export type VendaScalarFieldEnum = (typeof VendaScalarFieldEnum)[keyof typeof VendaScalarFieldEnum]


  export const VendaItemScalarFieldEnum: {
    id: 'id',
    quantidade: 'quantidade',
    valorUnitario: 'valorUnitario',
    total: 'total',
    precoCompraUsd: 'precoCompraUsd',
    custoTotal: 'custoTotal',
    createdAt: 'createdAt',
    vendaId: 'vendaId',
    produtoId: 'produtoId'
  };

  export type VendaItemScalarFieldEnum = (typeof VendaItemScalarFieldEnum)[keyof typeof VendaItemScalarFieldEnum]


  export const PagamentoScalarFieldEnum: {
    id: 'id',
    valor: 'valor',
    desconto: 'desconto',
    forma: 'forma',
    observacao: 'observacao',
    createdAt: 'createdAt',
    vendaId: 'vendaId'
  };

  export type PagamentoScalarFieldEnum = (typeof PagamentoScalarFieldEnum)[keyof typeof PagamentoScalarFieldEnum]


  export const GarantiaScalarFieldEnum: {
    id: 'id',
    cliente: 'cliente',
    telefone: 'telefone',
    tipo: 'tipo',
    inicio: 'inicio',
    fim: 'fim',
    observacao: 'observacao',
    createdAt: 'createdAt',
    produtoId: 'produtoId'
  };

  export type GarantiaScalarFieldEnum = (typeof GarantiaScalarFieldEnum)[keyof typeof GarantiaScalarFieldEnum]


  export const AssistenciaScalarFieldEnum: {
    id: 'id',
    cliente: 'cliente',
    telefone: 'telefone',
    problema: 'problema',
    observacao: 'observacao',
    status: 'status',
    custo: 'custo',
    dataEntrada: 'dataEntrada',
    dataSaida: 'dataSaida',
    createdAt: 'createdAt',
    produtoId: 'produtoId',
    aparelhoId: 'aparelhoId'
  };

  export type AssistenciaScalarFieldEnum = (typeof AssistenciaScalarFieldEnum)[keyof typeof AssistenciaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nome?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    ativo?: BoolFilter<"Usuario"> | boolean
    resetCode?: StringNullableFilter<"Usuario"> | string | null
    resetCodeExpiresAt?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetCodeExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nome?: StringFilter<"Usuario"> | string
    senha?: StringFilter<"Usuario"> | string
    role?: EnumRoleFilter<"Usuario"> | $Enums.Role
    ativo?: BoolFilter<"Usuario"> | boolean
    resetCode?: StringNullableFilter<"Usuario"> | string | null
    resetCodeExpiresAt?: DateTimeNullableFilter<"Usuario"> | Date | string | null
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
  }, "id" | "email">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    resetCode?: SortOrderInput | SortOrder
    resetCodeExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nome?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    senha?: StringWithAggregatesFilter<"Usuario"> | string
    role?: EnumRoleWithAggregatesFilter<"Usuario"> | $Enums.Role
    ativo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    resetCode?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    resetCodeExpiresAt?: DateTimeNullableWithAggregatesFilter<"Usuario"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
  }

  export type ProdutoWhereInput = {
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    id?: IntFilter<"Produto"> | number
    nome?: StringFilter<"Produto"> | string
    quantidade?: IntFilter<"Produto"> | number
    createdAt?: DateTimeFilter<"Produto"> | Date | string
    precoVendaUsd?: FloatNullableFilter<"Produto"> | number | null
    precoVendaBrl?: FloatNullableFilter<"Produto"> | number | null
    tipoPreco?: StringNullableFilter<"Produto"> | string | null
    aparelhos?: AparelhoListRelationFilter
    assistencias?: AssistenciaListRelationFilter
    garantias?: GarantiaListRelationFilter
    lotes?: LoteListRelationFilter
    vendasLegadas?: VendaListRelationFilter
    vendas?: VendaItemListRelationFilter
  }

  export type ProdutoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    quantidade?: SortOrder
    createdAt?: SortOrder
    precoVendaUsd?: SortOrderInput | SortOrder
    precoVendaBrl?: SortOrderInput | SortOrder
    tipoPreco?: SortOrderInput | SortOrder
    aparelhos?: AparelhoOrderByRelationAggregateInput
    assistencias?: AssistenciaOrderByRelationAggregateInput
    garantias?: GarantiaOrderByRelationAggregateInput
    lotes?: LoteOrderByRelationAggregateInput
    vendasLegadas?: VendaOrderByRelationAggregateInput
    vendas?: VendaItemOrderByRelationAggregateInput
  }

  export type ProdutoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProdutoWhereInput | ProdutoWhereInput[]
    OR?: ProdutoWhereInput[]
    NOT?: ProdutoWhereInput | ProdutoWhereInput[]
    nome?: StringFilter<"Produto"> | string
    quantidade?: IntFilter<"Produto"> | number
    createdAt?: DateTimeFilter<"Produto"> | Date | string
    precoVendaUsd?: FloatNullableFilter<"Produto"> | number | null
    precoVendaBrl?: FloatNullableFilter<"Produto"> | number | null
    tipoPreco?: StringNullableFilter<"Produto"> | string | null
    aparelhos?: AparelhoListRelationFilter
    assistencias?: AssistenciaListRelationFilter
    garantias?: GarantiaListRelationFilter
    lotes?: LoteListRelationFilter
    vendasLegadas?: VendaListRelationFilter
    vendas?: VendaItemListRelationFilter
  }, "id">

  export type ProdutoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    quantidade?: SortOrder
    createdAt?: SortOrder
    precoVendaUsd?: SortOrderInput | SortOrder
    precoVendaBrl?: SortOrderInput | SortOrder
    tipoPreco?: SortOrderInput | SortOrder
    _count?: ProdutoCountOrderByAggregateInput
    _avg?: ProdutoAvgOrderByAggregateInput
    _max?: ProdutoMaxOrderByAggregateInput
    _min?: ProdutoMinOrderByAggregateInput
    _sum?: ProdutoSumOrderByAggregateInput
  }

  export type ProdutoScalarWhereWithAggregatesInput = {
    AND?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    OR?: ProdutoScalarWhereWithAggregatesInput[]
    NOT?: ProdutoScalarWhereWithAggregatesInput | ProdutoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Produto"> | number
    nome?: StringWithAggregatesFilter<"Produto"> | string
    quantidade?: IntWithAggregatesFilter<"Produto"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Produto"> | Date | string
    precoVendaUsd?: FloatNullableWithAggregatesFilter<"Produto"> | number | null
    precoVendaBrl?: FloatNullableWithAggregatesFilter<"Produto"> | number | null
    tipoPreco?: StringNullableWithAggregatesFilter<"Produto"> | string | null
  }

  export type LoteWhereInput = {
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    id?: IntFilter<"Lote"> | number
    fornecedor?: StringNullableFilter<"Lote"> | string | null
    precoCompraUsd?: FloatNullableFilter<"Lote"> | number | null
    precoCompraBrl?: FloatNullableFilter<"Lote"> | number | null
    tipoCusto?: StringNullableFilter<"Lote"> | string | null
    quantidade?: IntFilter<"Lote"> | number
    observacao?: StringNullableFilter<"Lote"> | string | null
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    produtoId?: IntFilter<"Lote"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelhos?: AparelhoListRelationFilter
  }

  export type LoteOrderByWithRelationInput = {
    id?: SortOrder
    fornecedor?: SortOrderInput | SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    precoCompraBrl?: SortOrderInput | SortOrder
    tipoCusto?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
    aparelhos?: AparelhoOrderByRelationAggregateInput
  }

  export type LoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LoteWhereInput | LoteWhereInput[]
    OR?: LoteWhereInput[]
    NOT?: LoteWhereInput | LoteWhereInput[]
    fornecedor?: StringNullableFilter<"Lote"> | string | null
    precoCompraUsd?: FloatNullableFilter<"Lote"> | number | null
    precoCompraBrl?: FloatNullableFilter<"Lote"> | number | null
    tipoCusto?: StringNullableFilter<"Lote"> | string | null
    quantidade?: IntFilter<"Lote"> | number
    observacao?: StringNullableFilter<"Lote"> | string | null
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    produtoId?: IntFilter<"Lote"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelhos?: AparelhoListRelationFilter
  }, "id">

  export type LoteOrderByWithAggregationInput = {
    id?: SortOrder
    fornecedor?: SortOrderInput | SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    precoCompraBrl?: SortOrderInput | SortOrder
    tipoCusto?: SortOrderInput | SortOrder
    quantidade?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    _count?: LoteCountOrderByAggregateInput
    _avg?: LoteAvgOrderByAggregateInput
    _max?: LoteMaxOrderByAggregateInput
    _min?: LoteMinOrderByAggregateInput
    _sum?: LoteSumOrderByAggregateInput
  }

  export type LoteScalarWhereWithAggregatesInput = {
    AND?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    OR?: LoteScalarWhereWithAggregatesInput[]
    NOT?: LoteScalarWhereWithAggregatesInput | LoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lote"> | number
    fornecedor?: StringNullableWithAggregatesFilter<"Lote"> | string | null
    precoCompraUsd?: FloatNullableWithAggregatesFilter<"Lote"> | number | null
    precoCompraBrl?: FloatNullableWithAggregatesFilter<"Lote"> | number | null
    tipoCusto?: StringNullableWithAggregatesFilter<"Lote"> | string | null
    quantidade?: IntWithAggregatesFilter<"Lote"> | number
    observacao?: StringNullableWithAggregatesFilter<"Lote"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lote"> | Date | string
    produtoId?: IntWithAggregatesFilter<"Lote"> | number
  }

  export type AparelhoWhereInput = {
    AND?: AparelhoWhereInput | AparelhoWhereInput[]
    OR?: AparelhoWhereInput[]
    NOT?: AparelhoWhereInput | AparelhoWhereInput[]
    id?: IntFilter<"Aparelho"> | number
    imei?: StringFilter<"Aparelho"> | string
    vendido?: BoolFilter<"Aparelho"> | boolean
    createdAt?: DateTimeFilter<"Aparelho"> | Date | string
    loteId?: IntFilter<"Aparelho"> | number
    produtoId?: IntFilter<"Aparelho"> | number
    vendaItemId?: IntNullableFilter<"Aparelho"> | number | null
    lote?: XOR<LoteScalarRelationFilter, LoteWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    vendaItem?: XOR<VendaItemNullableScalarRelationFilter, VendaItemWhereInput> | null
    assistencias?: AssistenciaListRelationFilter
  }

  export type AparelhoOrderByWithRelationInput = {
    id?: SortOrder
    imei?: SortOrder
    vendido?: SortOrder
    createdAt?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrderInput | SortOrder
    lote?: LoteOrderByWithRelationInput
    produto?: ProdutoOrderByWithRelationInput
    vendaItem?: VendaItemOrderByWithRelationInput
    assistencias?: AssistenciaOrderByRelationAggregateInput
  }

  export type AparelhoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    imei?: string
    AND?: AparelhoWhereInput | AparelhoWhereInput[]
    OR?: AparelhoWhereInput[]
    NOT?: AparelhoWhereInput | AparelhoWhereInput[]
    vendido?: BoolFilter<"Aparelho"> | boolean
    createdAt?: DateTimeFilter<"Aparelho"> | Date | string
    loteId?: IntFilter<"Aparelho"> | number
    produtoId?: IntFilter<"Aparelho"> | number
    vendaItemId?: IntNullableFilter<"Aparelho"> | number | null
    lote?: XOR<LoteScalarRelationFilter, LoteWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    vendaItem?: XOR<VendaItemNullableScalarRelationFilter, VendaItemWhereInput> | null
    assistencias?: AssistenciaListRelationFilter
  }, "id" | "imei">

  export type AparelhoOrderByWithAggregationInput = {
    id?: SortOrder
    imei?: SortOrder
    vendido?: SortOrder
    createdAt?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrderInput | SortOrder
    _count?: AparelhoCountOrderByAggregateInput
    _avg?: AparelhoAvgOrderByAggregateInput
    _max?: AparelhoMaxOrderByAggregateInput
    _min?: AparelhoMinOrderByAggregateInput
    _sum?: AparelhoSumOrderByAggregateInput
  }

  export type AparelhoScalarWhereWithAggregatesInput = {
    AND?: AparelhoScalarWhereWithAggregatesInput | AparelhoScalarWhereWithAggregatesInput[]
    OR?: AparelhoScalarWhereWithAggregatesInput[]
    NOT?: AparelhoScalarWhereWithAggregatesInput | AparelhoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Aparelho"> | number
    imei?: StringWithAggregatesFilter<"Aparelho"> | string
    vendido?: BoolWithAggregatesFilter<"Aparelho"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Aparelho"> | Date | string
    loteId?: IntWithAggregatesFilter<"Aparelho"> | number
    produtoId?: IntWithAggregatesFilter<"Aparelho"> | number
    vendaItemId?: IntNullableWithAggregatesFilter<"Aparelho"> | number | null
  }

  export type VendaWhereInput = {
    AND?: VendaWhereInput | VendaWhereInput[]
    OR?: VendaWhereInput[]
    NOT?: VendaWhereInput | VendaWhereInput[]
    id?: IntFilter<"Venda"> | number
    cliente?: StringFilter<"Venda"> | string
    taxa?: FloatNullableFilter<"Venda"> | number | null
    taxaFechada?: BoolFilter<"Venda"> | boolean
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    createdAt?: DateTimeFilter<"Venda"> | Date | string
    produtoId?: IntNullableFilter<"Venda"> | number | null
    quantidade?: IntNullableFilter<"Venda"> | number | null
    valorVenda?: FloatNullableFilter<"Venda"> | number | null
    precoCompraUsd?: FloatNullableFilter<"Venda"> | number | null
    formaPagamento?: StringNullableFilter<"Venda"> | string | null
    estadoFatura?: StringNullableFilter<"Venda"> | string | null
    desconto?: FloatFilter<"Venda"> | number
    produto?: XOR<ProdutoNullableScalarRelationFilter, ProdutoWhereInput> | null
    itens?: VendaItemListRelationFilter
    pagamentos?: PagamentoListRelationFilter
  }

  export type VendaOrderByWithRelationInput = {
    id?: SortOrder
    cliente?: SortOrder
    taxa?: SortOrderInput | SortOrder
    taxaFechada?: SortOrder
    dataVenda?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrderInput | SortOrder
    quantidade?: SortOrderInput | SortOrder
    valorVenda?: SortOrderInput | SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    formaPagamento?: SortOrderInput | SortOrder
    estadoFatura?: SortOrderInput | SortOrder
    desconto?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
    itens?: VendaItemOrderByRelationAggregateInput
    pagamentos?: PagamentoOrderByRelationAggregateInput
  }

  export type VendaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendaWhereInput | VendaWhereInput[]
    OR?: VendaWhereInput[]
    NOT?: VendaWhereInput | VendaWhereInput[]
    cliente?: StringFilter<"Venda"> | string
    taxa?: FloatNullableFilter<"Venda"> | number | null
    taxaFechada?: BoolFilter<"Venda"> | boolean
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    createdAt?: DateTimeFilter<"Venda"> | Date | string
    produtoId?: IntNullableFilter<"Venda"> | number | null
    quantidade?: IntNullableFilter<"Venda"> | number | null
    valorVenda?: FloatNullableFilter<"Venda"> | number | null
    precoCompraUsd?: FloatNullableFilter<"Venda"> | number | null
    formaPagamento?: StringNullableFilter<"Venda"> | string | null
    estadoFatura?: StringNullableFilter<"Venda"> | string | null
    desconto?: FloatFilter<"Venda"> | number
    produto?: XOR<ProdutoNullableScalarRelationFilter, ProdutoWhereInput> | null
    itens?: VendaItemListRelationFilter
    pagamentos?: PagamentoListRelationFilter
  }, "id">

  export type VendaOrderByWithAggregationInput = {
    id?: SortOrder
    cliente?: SortOrder
    taxa?: SortOrderInput | SortOrder
    taxaFechada?: SortOrder
    dataVenda?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrderInput | SortOrder
    quantidade?: SortOrderInput | SortOrder
    valorVenda?: SortOrderInput | SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    formaPagamento?: SortOrderInput | SortOrder
    estadoFatura?: SortOrderInput | SortOrder
    desconto?: SortOrder
    _count?: VendaCountOrderByAggregateInput
    _avg?: VendaAvgOrderByAggregateInput
    _max?: VendaMaxOrderByAggregateInput
    _min?: VendaMinOrderByAggregateInput
    _sum?: VendaSumOrderByAggregateInput
  }

  export type VendaScalarWhereWithAggregatesInput = {
    AND?: VendaScalarWhereWithAggregatesInput | VendaScalarWhereWithAggregatesInput[]
    OR?: VendaScalarWhereWithAggregatesInput[]
    NOT?: VendaScalarWhereWithAggregatesInput | VendaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Venda"> | number
    cliente?: StringWithAggregatesFilter<"Venda"> | string
    taxa?: FloatNullableWithAggregatesFilter<"Venda"> | number | null
    taxaFechada?: BoolWithAggregatesFilter<"Venda"> | boolean
    dataVenda?: DateTimeWithAggregatesFilter<"Venda"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Venda"> | Date | string
    produtoId?: IntNullableWithAggregatesFilter<"Venda"> | number | null
    quantidade?: IntNullableWithAggregatesFilter<"Venda"> | number | null
    valorVenda?: FloatNullableWithAggregatesFilter<"Venda"> | number | null
    precoCompraUsd?: FloatNullableWithAggregatesFilter<"Venda"> | number | null
    formaPagamento?: StringNullableWithAggregatesFilter<"Venda"> | string | null
    estadoFatura?: StringNullableWithAggregatesFilter<"Venda"> | string | null
    desconto?: FloatWithAggregatesFilter<"Venda"> | number
  }

  export type VendaItemWhereInput = {
    AND?: VendaItemWhereInput | VendaItemWhereInput[]
    OR?: VendaItemWhereInput[]
    NOT?: VendaItemWhereInput | VendaItemWhereInput[]
    id?: IntFilter<"VendaItem"> | number
    quantidade?: IntFilter<"VendaItem"> | number
    valorUnitario?: FloatFilter<"VendaItem"> | number
    total?: FloatFilter<"VendaItem"> | number
    precoCompraUsd?: FloatNullableFilter<"VendaItem"> | number | null
    custoTotal?: FloatNullableFilter<"VendaItem"> | number | null
    createdAt?: DateTimeFilter<"VendaItem"> | Date | string
    vendaId?: IntFilter<"VendaItem"> | number
    produtoId?: IntFilter<"VendaItem"> | number
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelhos?: AparelhoListRelationFilter
  }

  export type VendaItemOrderByWithRelationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    custoTotal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
    venda?: VendaOrderByWithRelationInput
    produto?: ProdutoOrderByWithRelationInput
    aparelhos?: AparelhoOrderByRelationAggregateInput
  }

  export type VendaItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendaItemWhereInput | VendaItemWhereInput[]
    OR?: VendaItemWhereInput[]
    NOT?: VendaItemWhereInput | VendaItemWhereInput[]
    quantidade?: IntFilter<"VendaItem"> | number
    valorUnitario?: FloatFilter<"VendaItem"> | number
    total?: FloatFilter<"VendaItem"> | number
    precoCompraUsd?: FloatNullableFilter<"VendaItem"> | number | null
    custoTotal?: FloatNullableFilter<"VendaItem"> | number | null
    createdAt?: DateTimeFilter<"VendaItem"> | Date | string
    vendaId?: IntFilter<"VendaItem"> | number
    produtoId?: IntFilter<"VendaItem"> | number
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelhos?: AparelhoListRelationFilter
  }, "id">

  export type VendaItemOrderByWithAggregationInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrderInput | SortOrder
    custoTotal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
    _count?: VendaItemCountOrderByAggregateInput
    _avg?: VendaItemAvgOrderByAggregateInput
    _max?: VendaItemMaxOrderByAggregateInput
    _min?: VendaItemMinOrderByAggregateInput
    _sum?: VendaItemSumOrderByAggregateInput
  }

  export type VendaItemScalarWhereWithAggregatesInput = {
    AND?: VendaItemScalarWhereWithAggregatesInput | VendaItemScalarWhereWithAggregatesInput[]
    OR?: VendaItemScalarWhereWithAggregatesInput[]
    NOT?: VendaItemScalarWhereWithAggregatesInput | VendaItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VendaItem"> | number
    quantidade?: IntWithAggregatesFilter<"VendaItem"> | number
    valorUnitario?: FloatWithAggregatesFilter<"VendaItem"> | number
    total?: FloatWithAggregatesFilter<"VendaItem"> | number
    precoCompraUsd?: FloatNullableWithAggregatesFilter<"VendaItem"> | number | null
    custoTotal?: FloatNullableWithAggregatesFilter<"VendaItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"VendaItem"> | Date | string
    vendaId?: IntWithAggregatesFilter<"VendaItem"> | number
    produtoId?: IntWithAggregatesFilter<"VendaItem"> | number
  }

  export type PagamentoWhereInput = {
    AND?: PagamentoWhereInput | PagamentoWhereInput[]
    OR?: PagamentoWhereInput[]
    NOT?: PagamentoWhereInput | PagamentoWhereInput[]
    id?: IntFilter<"Pagamento"> | number
    valor?: FloatFilter<"Pagamento"> | number
    desconto?: FloatFilter<"Pagamento"> | number
    forma?: StringNullableFilter<"Pagamento"> | string | null
    observacao?: StringNullableFilter<"Pagamento"> | string | null
    createdAt?: DateTimeFilter<"Pagamento"> | Date | string
    vendaId?: IntFilter<"Pagamento"> | number
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
  }

  export type PagamentoOrderByWithRelationInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    forma?: SortOrderInput | SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    venda?: VendaOrderByWithRelationInput
  }

  export type PagamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PagamentoWhereInput | PagamentoWhereInput[]
    OR?: PagamentoWhereInput[]
    NOT?: PagamentoWhereInput | PagamentoWhereInput[]
    valor?: FloatFilter<"Pagamento"> | number
    desconto?: FloatFilter<"Pagamento"> | number
    forma?: StringNullableFilter<"Pagamento"> | string | null
    observacao?: StringNullableFilter<"Pagamento"> | string | null
    createdAt?: DateTimeFilter<"Pagamento"> | Date | string
    vendaId?: IntFilter<"Pagamento"> | number
    venda?: XOR<VendaScalarRelationFilter, VendaWhereInput>
  }, "id">

  export type PagamentoOrderByWithAggregationInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    forma?: SortOrderInput | SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    _count?: PagamentoCountOrderByAggregateInput
    _avg?: PagamentoAvgOrderByAggregateInput
    _max?: PagamentoMaxOrderByAggregateInput
    _min?: PagamentoMinOrderByAggregateInput
    _sum?: PagamentoSumOrderByAggregateInput
  }

  export type PagamentoScalarWhereWithAggregatesInput = {
    AND?: PagamentoScalarWhereWithAggregatesInput | PagamentoScalarWhereWithAggregatesInput[]
    OR?: PagamentoScalarWhereWithAggregatesInput[]
    NOT?: PagamentoScalarWhereWithAggregatesInput | PagamentoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pagamento"> | number
    valor?: FloatWithAggregatesFilter<"Pagamento"> | number
    desconto?: FloatWithAggregatesFilter<"Pagamento"> | number
    forma?: StringNullableWithAggregatesFilter<"Pagamento"> | string | null
    observacao?: StringNullableWithAggregatesFilter<"Pagamento"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pagamento"> | Date | string
    vendaId?: IntWithAggregatesFilter<"Pagamento"> | number
  }

  export type GarantiaWhereInput = {
    AND?: GarantiaWhereInput | GarantiaWhereInput[]
    OR?: GarantiaWhereInput[]
    NOT?: GarantiaWhereInput | GarantiaWhereInput[]
    id?: IntFilter<"Garantia"> | number
    cliente?: StringFilter<"Garantia"> | string
    telefone?: StringNullableFilter<"Garantia"> | string | null
    tipo?: StringFilter<"Garantia"> | string
    inicio?: DateTimeFilter<"Garantia"> | Date | string
    fim?: DateTimeFilter<"Garantia"> | Date | string
    observacao?: StringNullableFilter<"Garantia"> | string | null
    createdAt?: DateTimeFilter<"Garantia"> | Date | string
    produtoId?: IntFilter<"Garantia"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }

  export type GarantiaOrderByWithRelationInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrderInput | SortOrder
    tipo?: SortOrder
    inicio?: SortOrder
    fim?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    produto?: ProdutoOrderByWithRelationInput
  }

  export type GarantiaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GarantiaWhereInput | GarantiaWhereInput[]
    OR?: GarantiaWhereInput[]
    NOT?: GarantiaWhereInput | GarantiaWhereInput[]
    cliente?: StringFilter<"Garantia"> | string
    telefone?: StringNullableFilter<"Garantia"> | string | null
    tipo?: StringFilter<"Garantia"> | string
    inicio?: DateTimeFilter<"Garantia"> | Date | string
    fim?: DateTimeFilter<"Garantia"> | Date | string
    observacao?: StringNullableFilter<"Garantia"> | string | null
    createdAt?: DateTimeFilter<"Garantia"> | Date | string
    produtoId?: IntFilter<"Garantia"> | number
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
  }, "id">

  export type GarantiaOrderByWithAggregationInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrderInput | SortOrder
    tipo?: SortOrder
    inicio?: SortOrder
    fim?: SortOrder
    observacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    _count?: GarantiaCountOrderByAggregateInput
    _avg?: GarantiaAvgOrderByAggregateInput
    _max?: GarantiaMaxOrderByAggregateInput
    _min?: GarantiaMinOrderByAggregateInput
    _sum?: GarantiaSumOrderByAggregateInput
  }

  export type GarantiaScalarWhereWithAggregatesInput = {
    AND?: GarantiaScalarWhereWithAggregatesInput | GarantiaScalarWhereWithAggregatesInput[]
    OR?: GarantiaScalarWhereWithAggregatesInput[]
    NOT?: GarantiaScalarWhereWithAggregatesInput | GarantiaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Garantia"> | number
    cliente?: StringWithAggregatesFilter<"Garantia"> | string
    telefone?: StringNullableWithAggregatesFilter<"Garantia"> | string | null
    tipo?: StringWithAggregatesFilter<"Garantia"> | string
    inicio?: DateTimeWithAggregatesFilter<"Garantia"> | Date | string
    fim?: DateTimeWithAggregatesFilter<"Garantia"> | Date | string
    observacao?: StringNullableWithAggregatesFilter<"Garantia"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Garantia"> | Date | string
    produtoId?: IntWithAggregatesFilter<"Garantia"> | number
  }

  export type AssistenciaWhereInput = {
    AND?: AssistenciaWhereInput | AssistenciaWhereInput[]
    OR?: AssistenciaWhereInput[]
    NOT?: AssistenciaWhereInput | AssistenciaWhereInput[]
    id?: IntFilter<"Assistencia"> | number
    cliente?: StringFilter<"Assistencia"> | string
    telefone?: StringNullableFilter<"Assistencia"> | string | null
    problema?: StringFilter<"Assistencia"> | string
    observacao?: StringNullableFilter<"Assistencia"> | string | null
    status?: StringFilter<"Assistencia"> | string
    custo?: FloatFilter<"Assistencia"> | number
    dataEntrada?: DateTimeFilter<"Assistencia"> | Date | string
    dataSaida?: DateTimeNullableFilter<"Assistencia"> | Date | string | null
    createdAt?: DateTimeFilter<"Assistencia"> | Date | string
    produtoId?: IntFilter<"Assistencia"> | number
    aparelhoId?: IntNullableFilter<"Assistencia"> | number | null
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelho?: XOR<AparelhoNullableScalarRelationFilter, AparelhoWhereInput> | null
  }

  export type AssistenciaOrderByWithRelationInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrderInput | SortOrder
    problema?: SortOrder
    observacao?: SortOrderInput | SortOrder
    status?: SortOrder
    custo?: SortOrder
    dataEntrada?: SortOrder
    dataSaida?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrderInput | SortOrder
    produto?: ProdutoOrderByWithRelationInput
    aparelho?: AparelhoOrderByWithRelationInput
  }

  export type AssistenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AssistenciaWhereInput | AssistenciaWhereInput[]
    OR?: AssistenciaWhereInput[]
    NOT?: AssistenciaWhereInput | AssistenciaWhereInput[]
    cliente?: StringFilter<"Assistencia"> | string
    telefone?: StringNullableFilter<"Assistencia"> | string | null
    problema?: StringFilter<"Assistencia"> | string
    observacao?: StringNullableFilter<"Assistencia"> | string | null
    status?: StringFilter<"Assistencia"> | string
    custo?: FloatFilter<"Assistencia"> | number
    dataEntrada?: DateTimeFilter<"Assistencia"> | Date | string
    dataSaida?: DateTimeNullableFilter<"Assistencia"> | Date | string | null
    createdAt?: DateTimeFilter<"Assistencia"> | Date | string
    produtoId?: IntFilter<"Assistencia"> | number
    aparelhoId?: IntNullableFilter<"Assistencia"> | number | null
    produto?: XOR<ProdutoScalarRelationFilter, ProdutoWhereInput>
    aparelho?: XOR<AparelhoNullableScalarRelationFilter, AparelhoWhereInput> | null
  }, "id">

  export type AssistenciaOrderByWithAggregationInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrderInput | SortOrder
    problema?: SortOrder
    observacao?: SortOrderInput | SortOrder
    status?: SortOrder
    custo?: SortOrder
    dataEntrada?: SortOrder
    dataSaida?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrderInput | SortOrder
    _count?: AssistenciaCountOrderByAggregateInput
    _avg?: AssistenciaAvgOrderByAggregateInput
    _max?: AssistenciaMaxOrderByAggregateInput
    _min?: AssistenciaMinOrderByAggregateInput
    _sum?: AssistenciaSumOrderByAggregateInput
  }

  export type AssistenciaScalarWhereWithAggregatesInput = {
    AND?: AssistenciaScalarWhereWithAggregatesInput | AssistenciaScalarWhereWithAggregatesInput[]
    OR?: AssistenciaScalarWhereWithAggregatesInput[]
    NOT?: AssistenciaScalarWhereWithAggregatesInput | AssistenciaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assistencia"> | number
    cliente?: StringWithAggregatesFilter<"Assistencia"> | string
    telefone?: StringNullableWithAggregatesFilter<"Assistencia"> | string | null
    problema?: StringWithAggregatesFilter<"Assistencia"> | string
    observacao?: StringNullableWithAggregatesFilter<"Assistencia"> | string | null
    status?: StringWithAggregatesFilter<"Assistencia"> | string
    custo?: FloatWithAggregatesFilter<"Assistencia"> | number
    dataEntrada?: DateTimeWithAggregatesFilter<"Assistencia"> | Date | string
    dataSaida?: DateTimeNullableWithAggregatesFilter<"Assistencia"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Assistencia"> | Date | string
    produtoId?: IntWithAggregatesFilter<"Assistencia"> | number
    aparelhoId?: IntNullableWithAggregatesFilter<"Assistencia"> | number | null
  }

  export type UsuarioCreateInput = {
    nome: string
    email: string
    senha: string
    role?: $Enums.Role
    ativo?: boolean
    resetCode?: string | null
    resetCodeExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nome: string
    email: string
    senha: string
    role?: $Enums.Role
    ativo?: boolean
    resetCode?: string | null
    resetCodeExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    ativo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    ativo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nome: string
    email: string
    senha: string
    role?: $Enums.Role
    ativo?: boolean
    resetCode?: string | null
    resetCodeExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsuarioUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    ativo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    ativo?: BoolFieldUpdateOperationsInput | boolean
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    resetCodeExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProdutoCreateInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateManyInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
  }

  export type ProdutoUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProdutoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoteCreateInput = {
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutLotesInput
    aparelhos?: AparelhoCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateInput = {
    id?: number
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    produtoId: number
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteUpdateInput = {
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutLotesNestedInput
    aparelhos?: AparelhoUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    aparelhos?: AparelhoUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteCreateManyInput = {
    id?: number
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type LoteUpdateManyMutationInput = {
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type AparelhoCreateInput = {
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    lote: LoteCreateNestedOneWithoutAparelhosInput
    produto: ProdutoCreateNestedOneWithoutAparelhosInput
    vendaItem?: VendaItemCreateNestedOneWithoutAparelhosInput
    assistencias?: AssistenciaCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoUncheckedCreateInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    produtoId: number
    vendaItemId?: number | null
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoUpdateInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutAparelhosNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutAparelhosNestedInput
    vendaItem?: VendaItemUpdateOneWithoutAparelhosNestedInput
    assistencias?: AssistenciaUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
    assistencias?: AssistenciaUncheckedUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoCreateManyInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    produtoId: number
    vendaItemId?: number | null
  }

  export type AparelhoUpdateManyMutationInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AparelhoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type VendaCreateInput = {
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    produto?: ProdutoCreateNestedOneWithoutVendasLegadasInput
    itens?: VendaItemCreateNestedManyWithoutVendaInput
    pagamentos?: PagamentoCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    produtoId?: number | null
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    itens?: VendaItemUncheckedCreateNestedManyWithoutVendaInput
    pagamentos?: PagamentoUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaUpdateInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneWithoutVendasLegadasNestedInput
    itens?: VendaItemUpdateManyWithoutVendaNestedInput
    pagamentos?: PagamentoUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: NullableIntFieldUpdateOperationsInput | number | null
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    itens?: VendaItemUncheckedUpdateManyWithoutVendaNestedInput
    pagamentos?: PagamentoUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type VendaCreateManyInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    produtoId?: number | null
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
  }

  export type VendaUpdateManyMutationInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
  }

  export type VendaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: NullableIntFieldUpdateOperationsInput | number | null
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
  }

  export type VendaItemCreateInput = {
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    venda: VendaCreateNestedOneWithoutItensInput
    produto: ProdutoCreateNestedOneWithoutVendasInput
    aparelhos?: AparelhoCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemUncheckedCreateInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    vendaId: number
    produtoId: number
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemUpdateInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venda?: VendaUpdateOneRequiredWithoutItensNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutVendasNestedInput
    aparelhos?: AparelhoUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
    aparelhos?: AparelhoUncheckedUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemCreateManyInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    vendaId: number
    produtoId: number
  }

  export type VendaItemUpdateManyMutationInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendaItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoCreateInput = {
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
    venda: VendaCreateNestedOneWithoutPagamentosInput
  }

  export type PagamentoUncheckedCreateInput = {
    id?: number
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
    vendaId: number
  }

  export type PagamentoUpdateInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venda?: VendaUpdateOneRequiredWithoutPagamentosNestedInput
  }

  export type PagamentoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoCreateManyInput = {
    id?: number
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
    vendaId: number
  }

  export type PagamentoUpdateManyMutationInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagamentoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
  }

  export type GarantiaCreateInput = {
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutGarantiasInput
  }

  export type GarantiaUncheckedCreateInput = {
    id?: number
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type GarantiaUpdateInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutGarantiasNestedInput
  }

  export type GarantiaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type GarantiaCreateManyInput = {
    id?: number
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type GarantiaUpdateManyMutationInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GarantiaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type AssistenciaCreateInput = {
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutAssistenciasInput
    aparelho?: AparelhoCreateNestedOneWithoutAssistenciasInput
  }

  export type AssistenciaUncheckedCreateInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produtoId: number
    aparelhoId?: number | null
  }

  export type AssistenciaUpdateInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutAssistenciasNestedInput
    aparelho?: AparelhoUpdateOneWithoutAssistenciasNestedInput
  }

  export type AssistenciaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    aparelhoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssistenciaCreateManyInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produtoId: number
    aparelhoId?: number | null
  }

  export type AssistenciaUpdateManyMutationInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssistenciaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    aparelhoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    resetCode?: SortOrder
    resetCodeExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    resetCode?: SortOrder
    resetCodeExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    ativo?: SortOrder
    resetCode?: SortOrder
    resetCodeExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AparelhoListRelationFilter = {
    every?: AparelhoWhereInput
    some?: AparelhoWhereInput
    none?: AparelhoWhereInput
  }

  export type AssistenciaListRelationFilter = {
    every?: AssistenciaWhereInput
    some?: AssistenciaWhereInput
    none?: AssistenciaWhereInput
  }

  export type GarantiaListRelationFilter = {
    every?: GarantiaWhereInput
    some?: GarantiaWhereInput
    none?: GarantiaWhereInput
  }

  export type LoteListRelationFilter = {
    every?: LoteWhereInput
    some?: LoteWhereInput
    none?: LoteWhereInput
  }

  export type VendaListRelationFilter = {
    every?: VendaWhereInput
    some?: VendaWhereInput
    none?: VendaWhereInput
  }

  export type VendaItemListRelationFilter = {
    every?: VendaItemWhereInput
    some?: VendaItemWhereInput
    none?: VendaItemWhereInput
  }

  export type AparelhoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssistenciaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GarantiaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendaItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProdutoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    quantidade?: SortOrder
    createdAt?: SortOrder
    precoVendaUsd?: SortOrder
    precoVendaBrl?: SortOrder
    tipoPreco?: SortOrder
  }

  export type ProdutoAvgOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    precoVendaUsd?: SortOrder
    precoVendaBrl?: SortOrder
  }

  export type ProdutoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    quantidade?: SortOrder
    createdAt?: SortOrder
    precoVendaUsd?: SortOrder
    precoVendaBrl?: SortOrder
    tipoPreco?: SortOrder
  }

  export type ProdutoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    quantidade?: SortOrder
    createdAt?: SortOrder
    precoVendaUsd?: SortOrder
    precoVendaBrl?: SortOrder
    tipoPreco?: SortOrder
  }

  export type ProdutoSumOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    precoVendaUsd?: SortOrder
    precoVendaBrl?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ProdutoScalarRelationFilter = {
    is?: ProdutoWhereInput
    isNot?: ProdutoWhereInput
  }

  export type LoteCountOrderByAggregateInput = {
    id?: SortOrder
    fornecedor?: SortOrder
    precoCompraUsd?: SortOrder
    precoCompraBrl?: SortOrder
    tipoCusto?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type LoteAvgOrderByAggregateInput = {
    id?: SortOrder
    precoCompraUsd?: SortOrder
    precoCompraBrl?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
  }

  export type LoteMaxOrderByAggregateInput = {
    id?: SortOrder
    fornecedor?: SortOrder
    precoCompraUsd?: SortOrder
    precoCompraBrl?: SortOrder
    tipoCusto?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type LoteMinOrderByAggregateInput = {
    id?: SortOrder
    fornecedor?: SortOrder
    precoCompraUsd?: SortOrder
    precoCompraBrl?: SortOrder
    tipoCusto?: SortOrder
    quantidade?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type LoteSumOrderByAggregateInput = {
    id?: SortOrder
    precoCompraUsd?: SortOrder
    precoCompraBrl?: SortOrder
    quantidade?: SortOrder
    produtoId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LoteScalarRelationFilter = {
    is?: LoteWhereInput
    isNot?: LoteWhereInput
  }

  export type VendaItemNullableScalarRelationFilter = {
    is?: VendaItemWhereInput | null
    isNot?: VendaItemWhereInput | null
  }

  export type AparelhoCountOrderByAggregateInput = {
    id?: SortOrder
    imei?: SortOrder
    vendido?: SortOrder
    createdAt?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrder
  }

  export type AparelhoAvgOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrder
  }

  export type AparelhoMaxOrderByAggregateInput = {
    id?: SortOrder
    imei?: SortOrder
    vendido?: SortOrder
    createdAt?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrder
  }

  export type AparelhoMinOrderByAggregateInput = {
    id?: SortOrder
    imei?: SortOrder
    vendido?: SortOrder
    createdAt?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrder
  }

  export type AparelhoSumOrderByAggregateInput = {
    id?: SortOrder
    loteId?: SortOrder
    produtoId?: SortOrder
    vendaItemId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ProdutoNullableScalarRelationFilter = {
    is?: ProdutoWhereInput | null
    isNot?: ProdutoWhereInput | null
  }

  export type PagamentoListRelationFilter = {
    every?: PagamentoWhereInput
    some?: PagamentoWhereInput
    none?: PagamentoWhereInput
  }

  export type PagamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendaCountOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    taxa?: SortOrder
    taxaFechada?: SortOrder
    dataVenda?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    valorVenda?: SortOrder
    precoCompraUsd?: SortOrder
    formaPagamento?: SortOrder
    estadoFatura?: SortOrder
    desconto?: SortOrder
  }

  export type VendaAvgOrderByAggregateInput = {
    id?: SortOrder
    taxa?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    valorVenda?: SortOrder
    precoCompraUsd?: SortOrder
    desconto?: SortOrder
  }

  export type VendaMaxOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    taxa?: SortOrder
    taxaFechada?: SortOrder
    dataVenda?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    valorVenda?: SortOrder
    precoCompraUsd?: SortOrder
    formaPagamento?: SortOrder
    estadoFatura?: SortOrder
    desconto?: SortOrder
  }

  export type VendaMinOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    taxa?: SortOrder
    taxaFechada?: SortOrder
    dataVenda?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    valorVenda?: SortOrder
    precoCompraUsd?: SortOrder
    formaPagamento?: SortOrder
    estadoFatura?: SortOrder
    desconto?: SortOrder
  }

  export type VendaSumOrderByAggregateInput = {
    id?: SortOrder
    taxa?: SortOrder
    produtoId?: SortOrder
    quantidade?: SortOrder
    valorVenda?: SortOrder
    precoCompraUsd?: SortOrder
    desconto?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type VendaScalarRelationFilter = {
    is?: VendaWhereInput
    isNot?: VendaWhereInput
  }

  export type VendaItemCountOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrder
    custoTotal?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
  }

  export type VendaItemAvgOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrder
    custoTotal?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
  }

  export type VendaItemMaxOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrder
    custoTotal?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
  }

  export type VendaItemMinOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrder
    custoTotal?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
  }

  export type VendaItemSumOrderByAggregateInput = {
    id?: SortOrder
    quantidade?: SortOrder
    valorUnitario?: SortOrder
    total?: SortOrder
    precoCompraUsd?: SortOrder
    custoTotal?: SortOrder
    vendaId?: SortOrder
    produtoId?: SortOrder
  }

  export type PagamentoCountOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    forma?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
  }

  export type PagamentoAvgOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    vendaId?: SortOrder
  }

  export type PagamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    forma?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
  }

  export type PagamentoMinOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    forma?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    vendaId?: SortOrder
  }

  export type PagamentoSumOrderByAggregateInput = {
    id?: SortOrder
    valor?: SortOrder
    desconto?: SortOrder
    vendaId?: SortOrder
  }

  export type GarantiaCountOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    inicio?: SortOrder
    fim?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type GarantiaAvgOrderByAggregateInput = {
    id?: SortOrder
    produtoId?: SortOrder
  }

  export type GarantiaMaxOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    inicio?: SortOrder
    fim?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type GarantiaMinOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    tipo?: SortOrder
    inicio?: SortOrder
    fim?: SortOrder
    observacao?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
  }

  export type GarantiaSumOrderByAggregateInput = {
    id?: SortOrder
    produtoId?: SortOrder
  }

  export type AparelhoNullableScalarRelationFilter = {
    is?: AparelhoWhereInput | null
    isNot?: AparelhoWhereInput | null
  }

  export type AssistenciaCountOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    problema?: SortOrder
    observacao?: SortOrder
    status?: SortOrder
    custo?: SortOrder
    dataEntrada?: SortOrder
    dataSaida?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrder
  }

  export type AssistenciaAvgOrderByAggregateInput = {
    id?: SortOrder
    custo?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrder
  }

  export type AssistenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    problema?: SortOrder
    observacao?: SortOrder
    status?: SortOrder
    custo?: SortOrder
    dataEntrada?: SortOrder
    dataSaida?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrder
  }

  export type AssistenciaMinOrderByAggregateInput = {
    id?: SortOrder
    cliente?: SortOrder
    telefone?: SortOrder
    problema?: SortOrder
    observacao?: SortOrder
    status?: SortOrder
    custo?: SortOrder
    dataEntrada?: SortOrder
    dataSaida?: SortOrder
    createdAt?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrder
  }

  export type AssistenciaSumOrderByAggregateInput = {
    id?: SortOrder
    custo?: SortOrder
    produtoId?: SortOrder
    aparelhoId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AparelhoCreateNestedManyWithoutProdutoInput = {
    create?: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput> | AparelhoCreateWithoutProdutoInput[] | AparelhoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutProdutoInput | AparelhoCreateOrConnectWithoutProdutoInput[]
    createMany?: AparelhoCreateManyProdutoInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type AssistenciaCreateNestedManyWithoutProdutoInput = {
    create?: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput> | AssistenciaCreateWithoutProdutoInput[] | AssistenciaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutProdutoInput | AssistenciaCreateOrConnectWithoutProdutoInput[]
    createMany?: AssistenciaCreateManyProdutoInputEnvelope
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
  }

  export type GarantiaCreateNestedManyWithoutProdutoInput = {
    create?: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput> | GarantiaCreateWithoutProdutoInput[] | GarantiaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: GarantiaCreateOrConnectWithoutProdutoInput | GarantiaCreateOrConnectWithoutProdutoInput[]
    createMany?: GarantiaCreateManyProdutoInputEnvelope
    connect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
  }

  export type LoteCreateNestedManyWithoutProdutoInput = {
    create?: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput> | LoteCreateWithoutProdutoInput[] | LoteUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutProdutoInput | LoteCreateOrConnectWithoutProdutoInput[]
    createMany?: LoteCreateManyProdutoInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type VendaCreateNestedManyWithoutProdutoInput = {
    create?: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput> | VendaCreateWithoutProdutoInput[] | VendaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutProdutoInput | VendaCreateOrConnectWithoutProdutoInput[]
    createMany?: VendaCreateManyProdutoInputEnvelope
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
  }

  export type VendaItemCreateNestedManyWithoutProdutoInput = {
    create?: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput> | VendaItemCreateWithoutProdutoInput[] | VendaItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutProdutoInput | VendaItemCreateOrConnectWithoutProdutoInput[]
    createMany?: VendaItemCreateManyProdutoInputEnvelope
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
  }

  export type AparelhoUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput> | AparelhoCreateWithoutProdutoInput[] | AparelhoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutProdutoInput | AparelhoCreateOrConnectWithoutProdutoInput[]
    createMany?: AparelhoCreateManyProdutoInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type AssistenciaUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput> | AssistenciaCreateWithoutProdutoInput[] | AssistenciaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutProdutoInput | AssistenciaCreateOrConnectWithoutProdutoInput[]
    createMany?: AssistenciaCreateManyProdutoInputEnvelope
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
  }

  export type GarantiaUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput> | GarantiaCreateWithoutProdutoInput[] | GarantiaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: GarantiaCreateOrConnectWithoutProdutoInput | GarantiaCreateOrConnectWithoutProdutoInput[]
    createMany?: GarantiaCreateManyProdutoInputEnvelope
    connect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
  }

  export type LoteUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput> | LoteCreateWithoutProdutoInput[] | LoteUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutProdutoInput | LoteCreateOrConnectWithoutProdutoInput[]
    createMany?: LoteCreateManyProdutoInputEnvelope
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
  }

  export type VendaUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput> | VendaCreateWithoutProdutoInput[] | VendaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutProdutoInput | VendaCreateOrConnectWithoutProdutoInput[]
    createMany?: VendaCreateManyProdutoInputEnvelope
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
  }

  export type VendaItemUncheckedCreateNestedManyWithoutProdutoInput = {
    create?: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput> | VendaItemCreateWithoutProdutoInput[] | VendaItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutProdutoInput | VendaItemCreateOrConnectWithoutProdutoInput[]
    createMany?: VendaItemCreateManyProdutoInputEnvelope
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AparelhoUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput> | AparelhoCreateWithoutProdutoInput[] | AparelhoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutProdutoInput | AparelhoCreateOrConnectWithoutProdutoInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutProdutoInput | AparelhoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: AparelhoCreateManyProdutoInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutProdutoInput | AparelhoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutProdutoInput | AparelhoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type AssistenciaUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput> | AssistenciaCreateWithoutProdutoInput[] | AssistenciaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutProdutoInput | AssistenciaCreateOrConnectWithoutProdutoInput[]
    upsert?: AssistenciaUpsertWithWhereUniqueWithoutProdutoInput | AssistenciaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: AssistenciaCreateManyProdutoInputEnvelope
    set?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    disconnect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    delete?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    update?: AssistenciaUpdateWithWhereUniqueWithoutProdutoInput | AssistenciaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: AssistenciaUpdateManyWithWhereWithoutProdutoInput | AssistenciaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
  }

  export type GarantiaUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput> | GarantiaCreateWithoutProdutoInput[] | GarantiaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: GarantiaCreateOrConnectWithoutProdutoInput | GarantiaCreateOrConnectWithoutProdutoInput[]
    upsert?: GarantiaUpsertWithWhereUniqueWithoutProdutoInput | GarantiaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: GarantiaCreateManyProdutoInputEnvelope
    set?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    disconnect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    delete?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    connect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    update?: GarantiaUpdateWithWhereUniqueWithoutProdutoInput | GarantiaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: GarantiaUpdateManyWithWhereWithoutProdutoInput | GarantiaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: GarantiaScalarWhereInput | GarantiaScalarWhereInput[]
  }

  export type LoteUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput> | LoteCreateWithoutProdutoInput[] | LoteUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutProdutoInput | LoteCreateOrConnectWithoutProdutoInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutProdutoInput | LoteUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: LoteCreateManyProdutoInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutProdutoInput | LoteUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutProdutoInput | LoteUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type VendaUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput> | VendaCreateWithoutProdutoInput[] | VendaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutProdutoInput | VendaCreateOrConnectWithoutProdutoInput[]
    upsert?: VendaUpsertWithWhereUniqueWithoutProdutoInput | VendaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: VendaCreateManyProdutoInputEnvelope
    set?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    disconnect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    delete?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    update?: VendaUpdateWithWhereUniqueWithoutProdutoInput | VendaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: VendaUpdateManyWithWhereWithoutProdutoInput | VendaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: VendaScalarWhereInput | VendaScalarWhereInput[]
  }

  export type VendaItemUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput> | VendaItemCreateWithoutProdutoInput[] | VendaItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutProdutoInput | VendaItemCreateOrConnectWithoutProdutoInput[]
    upsert?: VendaItemUpsertWithWhereUniqueWithoutProdutoInput | VendaItemUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: VendaItemCreateManyProdutoInputEnvelope
    set?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    disconnect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    delete?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    update?: VendaItemUpdateWithWhereUniqueWithoutProdutoInput | VendaItemUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: VendaItemUpdateManyWithWhereWithoutProdutoInput | VendaItemUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
  }

  export type AparelhoUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput> | AparelhoCreateWithoutProdutoInput[] | AparelhoUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutProdutoInput | AparelhoCreateOrConnectWithoutProdutoInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutProdutoInput | AparelhoUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: AparelhoCreateManyProdutoInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutProdutoInput | AparelhoUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutProdutoInput | AparelhoUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput> | AssistenciaCreateWithoutProdutoInput[] | AssistenciaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutProdutoInput | AssistenciaCreateOrConnectWithoutProdutoInput[]
    upsert?: AssistenciaUpsertWithWhereUniqueWithoutProdutoInput | AssistenciaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: AssistenciaCreateManyProdutoInputEnvelope
    set?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    disconnect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    delete?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    update?: AssistenciaUpdateWithWhereUniqueWithoutProdutoInput | AssistenciaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: AssistenciaUpdateManyWithWhereWithoutProdutoInput | AssistenciaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
  }

  export type GarantiaUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput> | GarantiaCreateWithoutProdutoInput[] | GarantiaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: GarantiaCreateOrConnectWithoutProdutoInput | GarantiaCreateOrConnectWithoutProdutoInput[]
    upsert?: GarantiaUpsertWithWhereUniqueWithoutProdutoInput | GarantiaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: GarantiaCreateManyProdutoInputEnvelope
    set?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    disconnect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    delete?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    connect?: GarantiaWhereUniqueInput | GarantiaWhereUniqueInput[]
    update?: GarantiaUpdateWithWhereUniqueWithoutProdutoInput | GarantiaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: GarantiaUpdateManyWithWhereWithoutProdutoInput | GarantiaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: GarantiaScalarWhereInput | GarantiaScalarWhereInput[]
  }

  export type LoteUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput> | LoteCreateWithoutProdutoInput[] | LoteUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: LoteCreateOrConnectWithoutProdutoInput | LoteCreateOrConnectWithoutProdutoInput[]
    upsert?: LoteUpsertWithWhereUniqueWithoutProdutoInput | LoteUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: LoteCreateManyProdutoInputEnvelope
    set?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    disconnect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    delete?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    connect?: LoteWhereUniqueInput | LoteWhereUniqueInput[]
    update?: LoteUpdateWithWhereUniqueWithoutProdutoInput | LoteUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: LoteUpdateManyWithWhereWithoutProdutoInput | LoteUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: LoteScalarWhereInput | LoteScalarWhereInput[]
  }

  export type VendaUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput> | VendaCreateWithoutProdutoInput[] | VendaUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaCreateOrConnectWithoutProdutoInput | VendaCreateOrConnectWithoutProdutoInput[]
    upsert?: VendaUpsertWithWhereUniqueWithoutProdutoInput | VendaUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: VendaCreateManyProdutoInputEnvelope
    set?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    disconnect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    delete?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    connect?: VendaWhereUniqueInput | VendaWhereUniqueInput[]
    update?: VendaUpdateWithWhereUniqueWithoutProdutoInput | VendaUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: VendaUpdateManyWithWhereWithoutProdutoInput | VendaUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: VendaScalarWhereInput | VendaScalarWhereInput[]
  }

  export type VendaItemUncheckedUpdateManyWithoutProdutoNestedInput = {
    create?: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput> | VendaItemCreateWithoutProdutoInput[] | VendaItemUncheckedCreateWithoutProdutoInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutProdutoInput | VendaItemCreateOrConnectWithoutProdutoInput[]
    upsert?: VendaItemUpsertWithWhereUniqueWithoutProdutoInput | VendaItemUpsertWithWhereUniqueWithoutProdutoInput[]
    createMany?: VendaItemCreateManyProdutoInputEnvelope
    set?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    disconnect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    delete?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    update?: VendaItemUpdateWithWhereUniqueWithoutProdutoInput | VendaItemUpdateWithWhereUniqueWithoutProdutoInput[]
    updateMany?: VendaItemUpdateManyWithWhereWithoutProdutoInput | VendaItemUpdateManyWithWhereWithoutProdutoInput[]
    deleteMany?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
  }

  export type ProdutoCreateNestedOneWithoutLotesInput = {
    create?: XOR<ProdutoCreateWithoutLotesInput, ProdutoUncheckedCreateWithoutLotesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutLotesInput
    connect?: ProdutoWhereUniqueInput
  }

  export type AparelhoCreateNestedManyWithoutLoteInput = {
    create?: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput> | AparelhoCreateWithoutLoteInput[] | AparelhoUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutLoteInput | AparelhoCreateOrConnectWithoutLoteInput[]
    createMany?: AparelhoCreateManyLoteInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type AparelhoUncheckedCreateNestedManyWithoutLoteInput = {
    create?: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput> | AparelhoCreateWithoutLoteInput[] | AparelhoUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutLoteInput | AparelhoCreateOrConnectWithoutLoteInput[]
    createMany?: AparelhoCreateManyLoteInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type ProdutoUpdateOneRequiredWithoutLotesNestedInput = {
    create?: XOR<ProdutoCreateWithoutLotesInput, ProdutoUncheckedCreateWithoutLotesInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutLotesInput
    upsert?: ProdutoUpsertWithoutLotesInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutLotesInput, ProdutoUpdateWithoutLotesInput>, ProdutoUncheckedUpdateWithoutLotesInput>
  }

  export type AparelhoUpdateManyWithoutLoteNestedInput = {
    create?: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput> | AparelhoCreateWithoutLoteInput[] | AparelhoUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutLoteInput | AparelhoCreateOrConnectWithoutLoteInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutLoteInput | AparelhoUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: AparelhoCreateManyLoteInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutLoteInput | AparelhoUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutLoteInput | AparelhoUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type AparelhoUncheckedUpdateManyWithoutLoteNestedInput = {
    create?: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput> | AparelhoCreateWithoutLoteInput[] | AparelhoUncheckedCreateWithoutLoteInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutLoteInput | AparelhoCreateOrConnectWithoutLoteInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutLoteInput | AparelhoUpsertWithWhereUniqueWithoutLoteInput[]
    createMany?: AparelhoCreateManyLoteInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutLoteInput | AparelhoUpdateWithWhereUniqueWithoutLoteInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutLoteInput | AparelhoUpdateManyWithWhereWithoutLoteInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type LoteCreateNestedOneWithoutAparelhosInput = {
    create?: XOR<LoteCreateWithoutAparelhosInput, LoteUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: LoteCreateOrConnectWithoutAparelhosInput
    connect?: LoteWhereUniqueInput
  }

  export type ProdutoCreateNestedOneWithoutAparelhosInput = {
    create?: XOR<ProdutoCreateWithoutAparelhosInput, ProdutoUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutAparelhosInput
    connect?: ProdutoWhereUniqueInput
  }

  export type VendaItemCreateNestedOneWithoutAparelhosInput = {
    create?: XOR<VendaItemCreateWithoutAparelhosInput, VendaItemUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: VendaItemCreateOrConnectWithoutAparelhosInput
    connect?: VendaItemWhereUniqueInput
  }

  export type AssistenciaCreateNestedManyWithoutAparelhoInput = {
    create?: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput> | AssistenciaCreateWithoutAparelhoInput[] | AssistenciaUncheckedCreateWithoutAparelhoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutAparelhoInput | AssistenciaCreateOrConnectWithoutAparelhoInput[]
    createMany?: AssistenciaCreateManyAparelhoInputEnvelope
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
  }

  export type AssistenciaUncheckedCreateNestedManyWithoutAparelhoInput = {
    create?: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput> | AssistenciaCreateWithoutAparelhoInput[] | AssistenciaUncheckedCreateWithoutAparelhoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutAparelhoInput | AssistenciaCreateOrConnectWithoutAparelhoInput[]
    createMany?: AssistenciaCreateManyAparelhoInputEnvelope
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
  }

  export type LoteUpdateOneRequiredWithoutAparelhosNestedInput = {
    create?: XOR<LoteCreateWithoutAparelhosInput, LoteUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: LoteCreateOrConnectWithoutAparelhosInput
    upsert?: LoteUpsertWithoutAparelhosInput
    connect?: LoteWhereUniqueInput
    update?: XOR<XOR<LoteUpdateToOneWithWhereWithoutAparelhosInput, LoteUpdateWithoutAparelhosInput>, LoteUncheckedUpdateWithoutAparelhosInput>
  }

  export type ProdutoUpdateOneRequiredWithoutAparelhosNestedInput = {
    create?: XOR<ProdutoCreateWithoutAparelhosInput, ProdutoUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutAparelhosInput
    upsert?: ProdutoUpsertWithoutAparelhosInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutAparelhosInput, ProdutoUpdateWithoutAparelhosInput>, ProdutoUncheckedUpdateWithoutAparelhosInput>
  }

  export type VendaItemUpdateOneWithoutAparelhosNestedInput = {
    create?: XOR<VendaItemCreateWithoutAparelhosInput, VendaItemUncheckedCreateWithoutAparelhosInput>
    connectOrCreate?: VendaItemCreateOrConnectWithoutAparelhosInput
    upsert?: VendaItemUpsertWithoutAparelhosInput
    disconnect?: VendaItemWhereInput | boolean
    delete?: VendaItemWhereInput | boolean
    connect?: VendaItemWhereUniqueInput
    update?: XOR<XOR<VendaItemUpdateToOneWithWhereWithoutAparelhosInput, VendaItemUpdateWithoutAparelhosInput>, VendaItemUncheckedUpdateWithoutAparelhosInput>
  }

  export type AssistenciaUpdateManyWithoutAparelhoNestedInput = {
    create?: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput> | AssistenciaCreateWithoutAparelhoInput[] | AssistenciaUncheckedCreateWithoutAparelhoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutAparelhoInput | AssistenciaCreateOrConnectWithoutAparelhoInput[]
    upsert?: AssistenciaUpsertWithWhereUniqueWithoutAparelhoInput | AssistenciaUpsertWithWhereUniqueWithoutAparelhoInput[]
    createMany?: AssistenciaCreateManyAparelhoInputEnvelope
    set?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    disconnect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    delete?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    update?: AssistenciaUpdateWithWhereUniqueWithoutAparelhoInput | AssistenciaUpdateWithWhereUniqueWithoutAparelhoInput[]
    updateMany?: AssistenciaUpdateManyWithWhereWithoutAparelhoInput | AssistenciaUpdateManyWithWhereWithoutAparelhoInput[]
    deleteMany?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssistenciaUncheckedUpdateManyWithoutAparelhoNestedInput = {
    create?: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput> | AssistenciaCreateWithoutAparelhoInput[] | AssistenciaUncheckedCreateWithoutAparelhoInput[]
    connectOrCreate?: AssistenciaCreateOrConnectWithoutAparelhoInput | AssistenciaCreateOrConnectWithoutAparelhoInput[]
    upsert?: AssistenciaUpsertWithWhereUniqueWithoutAparelhoInput | AssistenciaUpsertWithWhereUniqueWithoutAparelhoInput[]
    createMany?: AssistenciaCreateManyAparelhoInputEnvelope
    set?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    disconnect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    delete?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    connect?: AssistenciaWhereUniqueInput | AssistenciaWhereUniqueInput[]
    update?: AssistenciaUpdateWithWhereUniqueWithoutAparelhoInput | AssistenciaUpdateWithWhereUniqueWithoutAparelhoInput[]
    updateMany?: AssistenciaUpdateManyWithWhereWithoutAparelhoInput | AssistenciaUpdateManyWithWhereWithoutAparelhoInput[]
    deleteMany?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
  }

  export type ProdutoCreateNestedOneWithoutVendasLegadasInput = {
    create?: XOR<ProdutoCreateWithoutVendasLegadasInput, ProdutoUncheckedCreateWithoutVendasLegadasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutVendasLegadasInput
    connect?: ProdutoWhereUniqueInput
  }

  export type VendaItemCreateNestedManyWithoutVendaInput = {
    create?: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput> | VendaItemCreateWithoutVendaInput[] | VendaItemUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutVendaInput | VendaItemCreateOrConnectWithoutVendaInput[]
    createMany?: VendaItemCreateManyVendaInputEnvelope
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
  }

  export type PagamentoCreateNestedManyWithoutVendaInput = {
    create?: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput> | PagamentoCreateWithoutVendaInput[] | PagamentoUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: PagamentoCreateOrConnectWithoutVendaInput | PagamentoCreateOrConnectWithoutVendaInput[]
    createMany?: PagamentoCreateManyVendaInputEnvelope
    connect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
  }

  export type VendaItemUncheckedCreateNestedManyWithoutVendaInput = {
    create?: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput> | VendaItemCreateWithoutVendaInput[] | VendaItemUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutVendaInput | VendaItemCreateOrConnectWithoutVendaInput[]
    createMany?: VendaItemCreateManyVendaInputEnvelope
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
  }

  export type PagamentoUncheckedCreateNestedManyWithoutVendaInput = {
    create?: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput> | PagamentoCreateWithoutVendaInput[] | PagamentoUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: PagamentoCreateOrConnectWithoutVendaInput | PagamentoCreateOrConnectWithoutVendaInput[]
    createMany?: PagamentoCreateManyVendaInputEnvelope
    connect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProdutoUpdateOneWithoutVendasLegadasNestedInput = {
    create?: XOR<ProdutoCreateWithoutVendasLegadasInput, ProdutoUncheckedCreateWithoutVendasLegadasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutVendasLegadasInput
    upsert?: ProdutoUpsertWithoutVendasLegadasInput
    disconnect?: ProdutoWhereInput | boolean
    delete?: ProdutoWhereInput | boolean
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutVendasLegadasInput, ProdutoUpdateWithoutVendasLegadasInput>, ProdutoUncheckedUpdateWithoutVendasLegadasInput>
  }

  export type VendaItemUpdateManyWithoutVendaNestedInput = {
    create?: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput> | VendaItemCreateWithoutVendaInput[] | VendaItemUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutVendaInput | VendaItemCreateOrConnectWithoutVendaInput[]
    upsert?: VendaItemUpsertWithWhereUniqueWithoutVendaInput | VendaItemUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: VendaItemCreateManyVendaInputEnvelope
    set?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    disconnect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    delete?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    update?: VendaItemUpdateWithWhereUniqueWithoutVendaInput | VendaItemUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: VendaItemUpdateManyWithWhereWithoutVendaInput | VendaItemUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
  }

  export type PagamentoUpdateManyWithoutVendaNestedInput = {
    create?: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput> | PagamentoCreateWithoutVendaInput[] | PagamentoUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: PagamentoCreateOrConnectWithoutVendaInput | PagamentoCreateOrConnectWithoutVendaInput[]
    upsert?: PagamentoUpsertWithWhereUniqueWithoutVendaInput | PagamentoUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: PagamentoCreateManyVendaInputEnvelope
    set?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    disconnect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    delete?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    connect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    update?: PagamentoUpdateWithWhereUniqueWithoutVendaInput | PagamentoUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: PagamentoUpdateManyWithWhereWithoutVendaInput | PagamentoUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: PagamentoScalarWhereInput | PagamentoScalarWhereInput[]
  }

  export type VendaItemUncheckedUpdateManyWithoutVendaNestedInput = {
    create?: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput> | VendaItemCreateWithoutVendaInput[] | VendaItemUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: VendaItemCreateOrConnectWithoutVendaInput | VendaItemCreateOrConnectWithoutVendaInput[]
    upsert?: VendaItemUpsertWithWhereUniqueWithoutVendaInput | VendaItemUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: VendaItemCreateManyVendaInputEnvelope
    set?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    disconnect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    delete?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    connect?: VendaItemWhereUniqueInput | VendaItemWhereUniqueInput[]
    update?: VendaItemUpdateWithWhereUniqueWithoutVendaInput | VendaItemUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: VendaItemUpdateManyWithWhereWithoutVendaInput | VendaItemUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
  }

  export type PagamentoUncheckedUpdateManyWithoutVendaNestedInput = {
    create?: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput> | PagamentoCreateWithoutVendaInput[] | PagamentoUncheckedCreateWithoutVendaInput[]
    connectOrCreate?: PagamentoCreateOrConnectWithoutVendaInput | PagamentoCreateOrConnectWithoutVendaInput[]
    upsert?: PagamentoUpsertWithWhereUniqueWithoutVendaInput | PagamentoUpsertWithWhereUniqueWithoutVendaInput[]
    createMany?: PagamentoCreateManyVendaInputEnvelope
    set?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    disconnect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    delete?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    connect?: PagamentoWhereUniqueInput | PagamentoWhereUniqueInput[]
    update?: PagamentoUpdateWithWhereUniqueWithoutVendaInput | PagamentoUpdateWithWhereUniqueWithoutVendaInput[]
    updateMany?: PagamentoUpdateManyWithWhereWithoutVendaInput | PagamentoUpdateManyWithWhereWithoutVendaInput[]
    deleteMany?: PagamentoScalarWhereInput | PagamentoScalarWhereInput[]
  }

  export type VendaCreateNestedOneWithoutItensInput = {
    create?: XOR<VendaCreateWithoutItensInput, VendaUncheckedCreateWithoutItensInput>
    connectOrCreate?: VendaCreateOrConnectWithoutItensInput
    connect?: VendaWhereUniqueInput
  }

  export type ProdutoCreateNestedOneWithoutVendasInput = {
    create?: XOR<ProdutoCreateWithoutVendasInput, ProdutoUncheckedCreateWithoutVendasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutVendasInput
    connect?: ProdutoWhereUniqueInput
  }

  export type AparelhoCreateNestedManyWithoutVendaItemInput = {
    create?: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput> | AparelhoCreateWithoutVendaItemInput[] | AparelhoUncheckedCreateWithoutVendaItemInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutVendaItemInput | AparelhoCreateOrConnectWithoutVendaItemInput[]
    createMany?: AparelhoCreateManyVendaItemInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type AparelhoUncheckedCreateNestedManyWithoutVendaItemInput = {
    create?: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput> | AparelhoCreateWithoutVendaItemInput[] | AparelhoUncheckedCreateWithoutVendaItemInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutVendaItemInput | AparelhoCreateOrConnectWithoutVendaItemInput[]
    createMany?: AparelhoCreateManyVendaItemInputEnvelope
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
  }

  export type VendaUpdateOneRequiredWithoutItensNestedInput = {
    create?: XOR<VendaCreateWithoutItensInput, VendaUncheckedCreateWithoutItensInput>
    connectOrCreate?: VendaCreateOrConnectWithoutItensInput
    upsert?: VendaUpsertWithoutItensInput
    connect?: VendaWhereUniqueInput
    update?: XOR<XOR<VendaUpdateToOneWithWhereWithoutItensInput, VendaUpdateWithoutItensInput>, VendaUncheckedUpdateWithoutItensInput>
  }

  export type ProdutoUpdateOneRequiredWithoutVendasNestedInput = {
    create?: XOR<ProdutoCreateWithoutVendasInput, ProdutoUncheckedCreateWithoutVendasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutVendasInput
    upsert?: ProdutoUpsertWithoutVendasInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutVendasInput, ProdutoUpdateWithoutVendasInput>, ProdutoUncheckedUpdateWithoutVendasInput>
  }

  export type AparelhoUpdateManyWithoutVendaItemNestedInput = {
    create?: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput> | AparelhoCreateWithoutVendaItemInput[] | AparelhoUncheckedCreateWithoutVendaItemInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutVendaItemInput | AparelhoCreateOrConnectWithoutVendaItemInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutVendaItemInput | AparelhoUpsertWithWhereUniqueWithoutVendaItemInput[]
    createMany?: AparelhoCreateManyVendaItemInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutVendaItemInput | AparelhoUpdateWithWhereUniqueWithoutVendaItemInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutVendaItemInput | AparelhoUpdateManyWithWhereWithoutVendaItemInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type AparelhoUncheckedUpdateManyWithoutVendaItemNestedInput = {
    create?: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput> | AparelhoCreateWithoutVendaItemInput[] | AparelhoUncheckedCreateWithoutVendaItemInput[]
    connectOrCreate?: AparelhoCreateOrConnectWithoutVendaItemInput | AparelhoCreateOrConnectWithoutVendaItemInput[]
    upsert?: AparelhoUpsertWithWhereUniqueWithoutVendaItemInput | AparelhoUpsertWithWhereUniqueWithoutVendaItemInput[]
    createMany?: AparelhoCreateManyVendaItemInputEnvelope
    set?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    disconnect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    delete?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    connect?: AparelhoWhereUniqueInput | AparelhoWhereUniqueInput[]
    update?: AparelhoUpdateWithWhereUniqueWithoutVendaItemInput | AparelhoUpdateWithWhereUniqueWithoutVendaItemInput[]
    updateMany?: AparelhoUpdateManyWithWhereWithoutVendaItemInput | AparelhoUpdateManyWithWhereWithoutVendaItemInput[]
    deleteMany?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
  }

  export type VendaCreateNestedOneWithoutPagamentosInput = {
    create?: XOR<VendaCreateWithoutPagamentosInput, VendaUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: VendaCreateOrConnectWithoutPagamentosInput
    connect?: VendaWhereUniqueInput
  }

  export type VendaUpdateOneRequiredWithoutPagamentosNestedInput = {
    create?: XOR<VendaCreateWithoutPagamentosInput, VendaUncheckedCreateWithoutPagamentosInput>
    connectOrCreate?: VendaCreateOrConnectWithoutPagamentosInput
    upsert?: VendaUpsertWithoutPagamentosInput
    connect?: VendaWhereUniqueInput
    update?: XOR<XOR<VendaUpdateToOneWithWhereWithoutPagamentosInput, VendaUpdateWithoutPagamentosInput>, VendaUncheckedUpdateWithoutPagamentosInput>
  }

  export type ProdutoCreateNestedOneWithoutGarantiasInput = {
    create?: XOR<ProdutoCreateWithoutGarantiasInput, ProdutoUncheckedCreateWithoutGarantiasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutGarantiasInput
    connect?: ProdutoWhereUniqueInput
  }

  export type ProdutoUpdateOneRequiredWithoutGarantiasNestedInput = {
    create?: XOR<ProdutoCreateWithoutGarantiasInput, ProdutoUncheckedCreateWithoutGarantiasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutGarantiasInput
    upsert?: ProdutoUpsertWithoutGarantiasInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutGarantiasInput, ProdutoUpdateWithoutGarantiasInput>, ProdutoUncheckedUpdateWithoutGarantiasInput>
  }

  export type ProdutoCreateNestedOneWithoutAssistenciasInput = {
    create?: XOR<ProdutoCreateWithoutAssistenciasInput, ProdutoUncheckedCreateWithoutAssistenciasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutAssistenciasInput
    connect?: ProdutoWhereUniqueInput
  }

  export type AparelhoCreateNestedOneWithoutAssistenciasInput = {
    create?: XOR<AparelhoCreateWithoutAssistenciasInput, AparelhoUncheckedCreateWithoutAssistenciasInput>
    connectOrCreate?: AparelhoCreateOrConnectWithoutAssistenciasInput
    connect?: AparelhoWhereUniqueInput
  }

  export type ProdutoUpdateOneRequiredWithoutAssistenciasNestedInput = {
    create?: XOR<ProdutoCreateWithoutAssistenciasInput, ProdutoUncheckedCreateWithoutAssistenciasInput>
    connectOrCreate?: ProdutoCreateOrConnectWithoutAssistenciasInput
    upsert?: ProdutoUpsertWithoutAssistenciasInput
    connect?: ProdutoWhereUniqueInput
    update?: XOR<XOR<ProdutoUpdateToOneWithWhereWithoutAssistenciasInput, ProdutoUpdateWithoutAssistenciasInput>, ProdutoUncheckedUpdateWithoutAssistenciasInput>
  }

  export type AparelhoUpdateOneWithoutAssistenciasNestedInput = {
    create?: XOR<AparelhoCreateWithoutAssistenciasInput, AparelhoUncheckedCreateWithoutAssistenciasInput>
    connectOrCreate?: AparelhoCreateOrConnectWithoutAssistenciasInput
    upsert?: AparelhoUpsertWithoutAssistenciasInput
    disconnect?: AparelhoWhereInput | boolean
    delete?: AparelhoWhereInput | boolean
    connect?: AparelhoWhereUniqueInput
    update?: XOR<XOR<AparelhoUpdateToOneWithWhereWithoutAssistenciasInput, AparelhoUpdateWithoutAssistenciasInput>, AparelhoUncheckedUpdateWithoutAssistenciasInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AparelhoCreateWithoutProdutoInput = {
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    lote: LoteCreateNestedOneWithoutAparelhosInput
    vendaItem?: VendaItemCreateNestedOneWithoutAparelhosInput
    assistencias?: AssistenciaCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoUncheckedCreateWithoutProdutoInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    vendaItemId?: number | null
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoCreateOrConnectWithoutProdutoInput = {
    where: AparelhoWhereUniqueInput
    create: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput>
  }

  export type AparelhoCreateManyProdutoInputEnvelope = {
    data: AparelhoCreateManyProdutoInput | AparelhoCreateManyProdutoInput[]
  }

  export type AssistenciaCreateWithoutProdutoInput = {
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    aparelho?: AparelhoCreateNestedOneWithoutAssistenciasInput
  }

  export type AssistenciaUncheckedCreateWithoutProdutoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    aparelhoId?: number | null
  }

  export type AssistenciaCreateOrConnectWithoutProdutoInput = {
    where: AssistenciaWhereUniqueInput
    create: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput>
  }

  export type AssistenciaCreateManyProdutoInputEnvelope = {
    data: AssistenciaCreateManyProdutoInput | AssistenciaCreateManyProdutoInput[]
  }

  export type GarantiaCreateWithoutProdutoInput = {
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
  }

  export type GarantiaUncheckedCreateWithoutProdutoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
  }

  export type GarantiaCreateOrConnectWithoutProdutoInput = {
    where: GarantiaWhereUniqueInput
    create: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput>
  }

  export type GarantiaCreateManyProdutoInputEnvelope = {
    data: GarantiaCreateManyProdutoInput | GarantiaCreateManyProdutoInput[]
  }

  export type LoteCreateWithoutProdutoInput = {
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    aparelhos?: AparelhoCreateNestedManyWithoutLoteInput
  }

  export type LoteUncheckedCreateWithoutProdutoInput = {
    id?: number
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutLoteInput
  }

  export type LoteCreateOrConnectWithoutProdutoInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput>
  }

  export type LoteCreateManyProdutoInputEnvelope = {
    data: LoteCreateManyProdutoInput | LoteCreateManyProdutoInput[]
  }

  export type VendaCreateWithoutProdutoInput = {
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    itens?: VendaItemCreateNestedManyWithoutVendaInput
    pagamentos?: PagamentoCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateWithoutProdutoInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    itens?: VendaItemUncheckedCreateNestedManyWithoutVendaInput
    pagamentos?: PagamentoUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaCreateOrConnectWithoutProdutoInput = {
    where: VendaWhereUniqueInput
    create: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput>
  }

  export type VendaCreateManyProdutoInputEnvelope = {
    data: VendaCreateManyProdutoInput | VendaCreateManyProdutoInput[]
  }

  export type VendaItemCreateWithoutProdutoInput = {
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    venda: VendaCreateNestedOneWithoutItensInput
    aparelhos?: AparelhoCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemUncheckedCreateWithoutProdutoInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    vendaId: number
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemCreateOrConnectWithoutProdutoInput = {
    where: VendaItemWhereUniqueInput
    create: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput>
  }

  export type VendaItemCreateManyProdutoInputEnvelope = {
    data: VendaItemCreateManyProdutoInput | VendaItemCreateManyProdutoInput[]
  }

  export type AparelhoUpsertWithWhereUniqueWithoutProdutoInput = {
    where: AparelhoWhereUniqueInput
    update: XOR<AparelhoUpdateWithoutProdutoInput, AparelhoUncheckedUpdateWithoutProdutoInput>
    create: XOR<AparelhoCreateWithoutProdutoInput, AparelhoUncheckedCreateWithoutProdutoInput>
  }

  export type AparelhoUpdateWithWhereUniqueWithoutProdutoInput = {
    where: AparelhoWhereUniqueInput
    data: XOR<AparelhoUpdateWithoutProdutoInput, AparelhoUncheckedUpdateWithoutProdutoInput>
  }

  export type AparelhoUpdateManyWithWhereWithoutProdutoInput = {
    where: AparelhoScalarWhereInput
    data: XOR<AparelhoUpdateManyMutationInput, AparelhoUncheckedUpdateManyWithoutProdutoInput>
  }

  export type AparelhoScalarWhereInput = {
    AND?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
    OR?: AparelhoScalarWhereInput[]
    NOT?: AparelhoScalarWhereInput | AparelhoScalarWhereInput[]
    id?: IntFilter<"Aparelho"> | number
    imei?: StringFilter<"Aparelho"> | string
    vendido?: BoolFilter<"Aparelho"> | boolean
    createdAt?: DateTimeFilter<"Aparelho"> | Date | string
    loteId?: IntFilter<"Aparelho"> | number
    produtoId?: IntFilter<"Aparelho"> | number
    vendaItemId?: IntNullableFilter<"Aparelho"> | number | null
  }

  export type AssistenciaUpsertWithWhereUniqueWithoutProdutoInput = {
    where: AssistenciaWhereUniqueInput
    update: XOR<AssistenciaUpdateWithoutProdutoInput, AssistenciaUncheckedUpdateWithoutProdutoInput>
    create: XOR<AssistenciaCreateWithoutProdutoInput, AssistenciaUncheckedCreateWithoutProdutoInput>
  }

  export type AssistenciaUpdateWithWhereUniqueWithoutProdutoInput = {
    where: AssistenciaWhereUniqueInput
    data: XOR<AssistenciaUpdateWithoutProdutoInput, AssistenciaUncheckedUpdateWithoutProdutoInput>
  }

  export type AssistenciaUpdateManyWithWhereWithoutProdutoInput = {
    where: AssistenciaScalarWhereInput
    data: XOR<AssistenciaUpdateManyMutationInput, AssistenciaUncheckedUpdateManyWithoutProdutoInput>
  }

  export type AssistenciaScalarWhereInput = {
    AND?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
    OR?: AssistenciaScalarWhereInput[]
    NOT?: AssistenciaScalarWhereInput | AssistenciaScalarWhereInput[]
    id?: IntFilter<"Assistencia"> | number
    cliente?: StringFilter<"Assistencia"> | string
    telefone?: StringNullableFilter<"Assistencia"> | string | null
    problema?: StringFilter<"Assistencia"> | string
    observacao?: StringNullableFilter<"Assistencia"> | string | null
    status?: StringFilter<"Assistencia"> | string
    custo?: FloatFilter<"Assistencia"> | number
    dataEntrada?: DateTimeFilter<"Assistencia"> | Date | string
    dataSaida?: DateTimeNullableFilter<"Assistencia"> | Date | string | null
    createdAt?: DateTimeFilter<"Assistencia"> | Date | string
    produtoId?: IntFilter<"Assistencia"> | number
    aparelhoId?: IntNullableFilter<"Assistencia"> | number | null
  }

  export type GarantiaUpsertWithWhereUniqueWithoutProdutoInput = {
    where: GarantiaWhereUniqueInput
    update: XOR<GarantiaUpdateWithoutProdutoInput, GarantiaUncheckedUpdateWithoutProdutoInput>
    create: XOR<GarantiaCreateWithoutProdutoInput, GarantiaUncheckedCreateWithoutProdutoInput>
  }

  export type GarantiaUpdateWithWhereUniqueWithoutProdutoInput = {
    where: GarantiaWhereUniqueInput
    data: XOR<GarantiaUpdateWithoutProdutoInput, GarantiaUncheckedUpdateWithoutProdutoInput>
  }

  export type GarantiaUpdateManyWithWhereWithoutProdutoInput = {
    where: GarantiaScalarWhereInput
    data: XOR<GarantiaUpdateManyMutationInput, GarantiaUncheckedUpdateManyWithoutProdutoInput>
  }

  export type GarantiaScalarWhereInput = {
    AND?: GarantiaScalarWhereInput | GarantiaScalarWhereInput[]
    OR?: GarantiaScalarWhereInput[]
    NOT?: GarantiaScalarWhereInput | GarantiaScalarWhereInput[]
    id?: IntFilter<"Garantia"> | number
    cliente?: StringFilter<"Garantia"> | string
    telefone?: StringNullableFilter<"Garantia"> | string | null
    tipo?: StringFilter<"Garantia"> | string
    inicio?: DateTimeFilter<"Garantia"> | Date | string
    fim?: DateTimeFilter<"Garantia"> | Date | string
    observacao?: StringNullableFilter<"Garantia"> | string | null
    createdAt?: DateTimeFilter<"Garantia"> | Date | string
    produtoId?: IntFilter<"Garantia"> | number
  }

  export type LoteUpsertWithWhereUniqueWithoutProdutoInput = {
    where: LoteWhereUniqueInput
    update: XOR<LoteUpdateWithoutProdutoInput, LoteUncheckedUpdateWithoutProdutoInput>
    create: XOR<LoteCreateWithoutProdutoInput, LoteUncheckedCreateWithoutProdutoInput>
  }

  export type LoteUpdateWithWhereUniqueWithoutProdutoInput = {
    where: LoteWhereUniqueInput
    data: XOR<LoteUpdateWithoutProdutoInput, LoteUncheckedUpdateWithoutProdutoInput>
  }

  export type LoteUpdateManyWithWhereWithoutProdutoInput = {
    where: LoteScalarWhereInput
    data: XOR<LoteUpdateManyMutationInput, LoteUncheckedUpdateManyWithoutProdutoInput>
  }

  export type LoteScalarWhereInput = {
    AND?: LoteScalarWhereInput | LoteScalarWhereInput[]
    OR?: LoteScalarWhereInput[]
    NOT?: LoteScalarWhereInput | LoteScalarWhereInput[]
    id?: IntFilter<"Lote"> | number
    fornecedor?: StringNullableFilter<"Lote"> | string | null
    precoCompraUsd?: FloatNullableFilter<"Lote"> | number | null
    precoCompraBrl?: FloatNullableFilter<"Lote"> | number | null
    tipoCusto?: StringNullableFilter<"Lote"> | string | null
    quantidade?: IntFilter<"Lote"> | number
    observacao?: StringNullableFilter<"Lote"> | string | null
    createdAt?: DateTimeFilter<"Lote"> | Date | string
    produtoId?: IntFilter<"Lote"> | number
  }

  export type VendaUpsertWithWhereUniqueWithoutProdutoInput = {
    where: VendaWhereUniqueInput
    update: XOR<VendaUpdateWithoutProdutoInput, VendaUncheckedUpdateWithoutProdutoInput>
    create: XOR<VendaCreateWithoutProdutoInput, VendaUncheckedCreateWithoutProdutoInput>
  }

  export type VendaUpdateWithWhereUniqueWithoutProdutoInput = {
    where: VendaWhereUniqueInput
    data: XOR<VendaUpdateWithoutProdutoInput, VendaUncheckedUpdateWithoutProdutoInput>
  }

  export type VendaUpdateManyWithWhereWithoutProdutoInput = {
    where: VendaScalarWhereInput
    data: XOR<VendaUpdateManyMutationInput, VendaUncheckedUpdateManyWithoutProdutoInput>
  }

  export type VendaScalarWhereInput = {
    AND?: VendaScalarWhereInput | VendaScalarWhereInput[]
    OR?: VendaScalarWhereInput[]
    NOT?: VendaScalarWhereInput | VendaScalarWhereInput[]
    id?: IntFilter<"Venda"> | number
    cliente?: StringFilter<"Venda"> | string
    taxa?: FloatNullableFilter<"Venda"> | number | null
    taxaFechada?: BoolFilter<"Venda"> | boolean
    dataVenda?: DateTimeFilter<"Venda"> | Date | string
    createdAt?: DateTimeFilter<"Venda"> | Date | string
    produtoId?: IntNullableFilter<"Venda"> | number | null
    quantidade?: IntNullableFilter<"Venda"> | number | null
    valorVenda?: FloatNullableFilter<"Venda"> | number | null
    precoCompraUsd?: FloatNullableFilter<"Venda"> | number | null
    formaPagamento?: StringNullableFilter<"Venda"> | string | null
    estadoFatura?: StringNullableFilter<"Venda"> | string | null
    desconto?: FloatFilter<"Venda"> | number
  }

  export type VendaItemUpsertWithWhereUniqueWithoutProdutoInput = {
    where: VendaItemWhereUniqueInput
    update: XOR<VendaItemUpdateWithoutProdutoInput, VendaItemUncheckedUpdateWithoutProdutoInput>
    create: XOR<VendaItemCreateWithoutProdutoInput, VendaItemUncheckedCreateWithoutProdutoInput>
  }

  export type VendaItemUpdateWithWhereUniqueWithoutProdutoInput = {
    where: VendaItemWhereUniqueInput
    data: XOR<VendaItemUpdateWithoutProdutoInput, VendaItemUncheckedUpdateWithoutProdutoInput>
  }

  export type VendaItemUpdateManyWithWhereWithoutProdutoInput = {
    where: VendaItemScalarWhereInput
    data: XOR<VendaItemUpdateManyMutationInput, VendaItemUncheckedUpdateManyWithoutProdutoInput>
  }

  export type VendaItemScalarWhereInput = {
    AND?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
    OR?: VendaItemScalarWhereInput[]
    NOT?: VendaItemScalarWhereInput | VendaItemScalarWhereInput[]
    id?: IntFilter<"VendaItem"> | number
    quantidade?: IntFilter<"VendaItem"> | number
    valorUnitario?: FloatFilter<"VendaItem"> | number
    total?: FloatFilter<"VendaItem"> | number
    precoCompraUsd?: FloatNullableFilter<"VendaItem"> | number | null
    custoTotal?: FloatNullableFilter<"VendaItem"> | number | null
    createdAt?: DateTimeFilter<"VendaItem"> | Date | string
    vendaId?: IntFilter<"VendaItem"> | number
    produtoId?: IntFilter<"VendaItem"> | number
  }

  export type ProdutoCreateWithoutLotesInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutLotesInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutLotesInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutLotesInput, ProdutoUncheckedCreateWithoutLotesInput>
  }

  export type AparelhoCreateWithoutLoteInput = {
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutAparelhosInput
    vendaItem?: VendaItemCreateNestedOneWithoutAparelhosInput
    assistencias?: AssistenciaCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoUncheckedCreateWithoutLoteInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    produtoId: number
    vendaItemId?: number | null
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoCreateOrConnectWithoutLoteInput = {
    where: AparelhoWhereUniqueInput
    create: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput>
  }

  export type AparelhoCreateManyLoteInputEnvelope = {
    data: AparelhoCreateManyLoteInput | AparelhoCreateManyLoteInput[]
  }

  export type ProdutoUpsertWithoutLotesInput = {
    update: XOR<ProdutoUpdateWithoutLotesInput, ProdutoUncheckedUpdateWithoutLotesInput>
    create: XOR<ProdutoCreateWithoutLotesInput, ProdutoUncheckedCreateWithoutLotesInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutLotesInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutLotesInput, ProdutoUncheckedUpdateWithoutLotesInput>
  }

  export type ProdutoUpdateWithoutLotesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutLotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type AparelhoUpsertWithWhereUniqueWithoutLoteInput = {
    where: AparelhoWhereUniqueInput
    update: XOR<AparelhoUpdateWithoutLoteInput, AparelhoUncheckedUpdateWithoutLoteInput>
    create: XOR<AparelhoCreateWithoutLoteInput, AparelhoUncheckedCreateWithoutLoteInput>
  }

  export type AparelhoUpdateWithWhereUniqueWithoutLoteInput = {
    where: AparelhoWhereUniqueInput
    data: XOR<AparelhoUpdateWithoutLoteInput, AparelhoUncheckedUpdateWithoutLoteInput>
  }

  export type AparelhoUpdateManyWithWhereWithoutLoteInput = {
    where: AparelhoScalarWhereInput
    data: XOR<AparelhoUpdateManyMutationInput, AparelhoUncheckedUpdateManyWithoutLoteInput>
  }

  export type LoteCreateWithoutAparelhosInput = {
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutLotesInput
  }

  export type LoteUncheckedCreateWithoutAparelhosInput = {
    id?: number
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type LoteCreateOrConnectWithoutAparelhosInput = {
    where: LoteWhereUniqueInput
    create: XOR<LoteCreateWithoutAparelhosInput, LoteUncheckedCreateWithoutAparelhosInput>
  }

  export type ProdutoCreateWithoutAparelhosInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutAparelhosInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutAparelhosInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutAparelhosInput, ProdutoUncheckedCreateWithoutAparelhosInput>
  }

  export type VendaItemCreateWithoutAparelhosInput = {
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    venda: VendaCreateNestedOneWithoutItensInput
    produto: ProdutoCreateNestedOneWithoutVendasInput
  }

  export type VendaItemUncheckedCreateWithoutAparelhosInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    vendaId: number
    produtoId: number
  }

  export type VendaItemCreateOrConnectWithoutAparelhosInput = {
    where: VendaItemWhereUniqueInput
    create: XOR<VendaItemCreateWithoutAparelhosInput, VendaItemUncheckedCreateWithoutAparelhosInput>
  }

  export type AssistenciaCreateWithoutAparelhoInput = {
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutAssistenciasInput
  }

  export type AssistenciaUncheckedCreateWithoutAparelhoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type AssistenciaCreateOrConnectWithoutAparelhoInput = {
    where: AssistenciaWhereUniqueInput
    create: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput>
  }

  export type AssistenciaCreateManyAparelhoInputEnvelope = {
    data: AssistenciaCreateManyAparelhoInput | AssistenciaCreateManyAparelhoInput[]
  }

  export type LoteUpsertWithoutAparelhosInput = {
    update: XOR<LoteUpdateWithoutAparelhosInput, LoteUncheckedUpdateWithoutAparelhosInput>
    create: XOR<LoteCreateWithoutAparelhosInput, LoteUncheckedCreateWithoutAparelhosInput>
    where?: LoteWhereInput
  }

  export type LoteUpdateToOneWithWhereWithoutAparelhosInput = {
    where?: LoteWhereInput
    data: XOR<LoteUpdateWithoutAparelhosInput, LoteUncheckedUpdateWithoutAparelhosInput>
  }

  export type LoteUpdateWithoutAparelhosInput = {
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutLotesNestedInput
  }

  export type LoteUncheckedUpdateWithoutAparelhosInput = {
    id?: IntFieldUpdateOperationsInput | number
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type ProdutoUpsertWithoutAparelhosInput = {
    update: XOR<ProdutoUpdateWithoutAparelhosInput, ProdutoUncheckedUpdateWithoutAparelhosInput>
    create: XOR<ProdutoCreateWithoutAparelhosInput, ProdutoUncheckedCreateWithoutAparelhosInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutAparelhosInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutAparelhosInput, ProdutoUncheckedUpdateWithoutAparelhosInput>
  }

  export type ProdutoUpdateWithoutAparelhosInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutAparelhosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type VendaItemUpsertWithoutAparelhosInput = {
    update: XOR<VendaItemUpdateWithoutAparelhosInput, VendaItemUncheckedUpdateWithoutAparelhosInput>
    create: XOR<VendaItemCreateWithoutAparelhosInput, VendaItemUncheckedCreateWithoutAparelhosInput>
    where?: VendaItemWhereInput
  }

  export type VendaItemUpdateToOneWithWhereWithoutAparelhosInput = {
    where?: VendaItemWhereInput
    data: XOR<VendaItemUpdateWithoutAparelhosInput, VendaItemUncheckedUpdateWithoutAparelhosInput>
  }

  export type VendaItemUpdateWithoutAparelhosInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venda?: VendaUpdateOneRequiredWithoutItensNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutVendasNestedInput
  }

  export type VendaItemUncheckedUpdateWithoutAparelhosInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type AssistenciaUpsertWithWhereUniqueWithoutAparelhoInput = {
    where: AssistenciaWhereUniqueInput
    update: XOR<AssistenciaUpdateWithoutAparelhoInput, AssistenciaUncheckedUpdateWithoutAparelhoInput>
    create: XOR<AssistenciaCreateWithoutAparelhoInput, AssistenciaUncheckedCreateWithoutAparelhoInput>
  }

  export type AssistenciaUpdateWithWhereUniqueWithoutAparelhoInput = {
    where: AssistenciaWhereUniqueInput
    data: XOR<AssistenciaUpdateWithoutAparelhoInput, AssistenciaUncheckedUpdateWithoutAparelhoInput>
  }

  export type AssistenciaUpdateManyWithWhereWithoutAparelhoInput = {
    where: AssistenciaScalarWhereInput
    data: XOR<AssistenciaUpdateManyMutationInput, AssistenciaUncheckedUpdateManyWithoutAparelhoInput>
  }

  export type ProdutoCreateWithoutVendasLegadasInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutVendasLegadasInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutVendasLegadasInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutVendasLegadasInput, ProdutoUncheckedCreateWithoutVendasLegadasInput>
  }

  export type VendaItemCreateWithoutVendaInput = {
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    produto: ProdutoCreateNestedOneWithoutVendasInput
    aparelhos?: AparelhoCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemUncheckedCreateWithoutVendaInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    produtoId: number
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutVendaItemInput
  }

  export type VendaItemCreateOrConnectWithoutVendaInput = {
    where: VendaItemWhereUniqueInput
    create: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput>
  }

  export type VendaItemCreateManyVendaInputEnvelope = {
    data: VendaItemCreateManyVendaInput | VendaItemCreateManyVendaInput[]
  }

  export type PagamentoCreateWithoutVendaInput = {
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
  }

  export type PagamentoUncheckedCreateWithoutVendaInput = {
    id?: number
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
  }

  export type PagamentoCreateOrConnectWithoutVendaInput = {
    where: PagamentoWhereUniqueInput
    create: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput>
  }

  export type PagamentoCreateManyVendaInputEnvelope = {
    data: PagamentoCreateManyVendaInput | PagamentoCreateManyVendaInput[]
  }

  export type ProdutoUpsertWithoutVendasLegadasInput = {
    update: XOR<ProdutoUpdateWithoutVendasLegadasInput, ProdutoUncheckedUpdateWithoutVendasLegadasInput>
    create: XOR<ProdutoCreateWithoutVendasLegadasInput, ProdutoUncheckedCreateWithoutVendasLegadasInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutVendasLegadasInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutVendasLegadasInput, ProdutoUncheckedUpdateWithoutVendasLegadasInput>
  }

  export type ProdutoUpdateWithoutVendasLegadasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutVendasLegadasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type VendaItemUpsertWithWhereUniqueWithoutVendaInput = {
    where: VendaItemWhereUniqueInput
    update: XOR<VendaItemUpdateWithoutVendaInput, VendaItemUncheckedUpdateWithoutVendaInput>
    create: XOR<VendaItemCreateWithoutVendaInput, VendaItemUncheckedCreateWithoutVendaInput>
  }

  export type VendaItemUpdateWithWhereUniqueWithoutVendaInput = {
    where: VendaItemWhereUniqueInput
    data: XOR<VendaItemUpdateWithoutVendaInput, VendaItemUncheckedUpdateWithoutVendaInput>
  }

  export type VendaItemUpdateManyWithWhereWithoutVendaInput = {
    where: VendaItemScalarWhereInput
    data: XOR<VendaItemUpdateManyMutationInput, VendaItemUncheckedUpdateManyWithoutVendaInput>
  }

  export type PagamentoUpsertWithWhereUniqueWithoutVendaInput = {
    where: PagamentoWhereUniqueInput
    update: XOR<PagamentoUpdateWithoutVendaInput, PagamentoUncheckedUpdateWithoutVendaInput>
    create: XOR<PagamentoCreateWithoutVendaInput, PagamentoUncheckedCreateWithoutVendaInput>
  }

  export type PagamentoUpdateWithWhereUniqueWithoutVendaInput = {
    where: PagamentoWhereUniqueInput
    data: XOR<PagamentoUpdateWithoutVendaInput, PagamentoUncheckedUpdateWithoutVendaInput>
  }

  export type PagamentoUpdateManyWithWhereWithoutVendaInput = {
    where: PagamentoScalarWhereInput
    data: XOR<PagamentoUpdateManyMutationInput, PagamentoUncheckedUpdateManyWithoutVendaInput>
  }

  export type PagamentoScalarWhereInput = {
    AND?: PagamentoScalarWhereInput | PagamentoScalarWhereInput[]
    OR?: PagamentoScalarWhereInput[]
    NOT?: PagamentoScalarWhereInput | PagamentoScalarWhereInput[]
    id?: IntFilter<"Pagamento"> | number
    valor?: FloatFilter<"Pagamento"> | number
    desconto?: FloatFilter<"Pagamento"> | number
    forma?: StringNullableFilter<"Pagamento"> | string | null
    observacao?: StringNullableFilter<"Pagamento"> | string | null
    createdAt?: DateTimeFilter<"Pagamento"> | Date | string
    vendaId?: IntFilter<"Pagamento"> | number
  }

  export type VendaCreateWithoutItensInput = {
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    produto?: ProdutoCreateNestedOneWithoutVendasLegadasInput
    pagamentos?: PagamentoCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateWithoutItensInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    produtoId?: number | null
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    pagamentos?: PagamentoUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaCreateOrConnectWithoutItensInput = {
    where: VendaWhereUniqueInput
    create: XOR<VendaCreateWithoutItensInput, VendaUncheckedCreateWithoutItensInput>
  }

  export type ProdutoCreateWithoutVendasInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutVendasInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutVendasInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutVendasInput, ProdutoUncheckedCreateWithoutVendasInput>
  }

  export type AparelhoCreateWithoutVendaItemInput = {
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    lote: LoteCreateNestedOneWithoutAparelhosInput
    produto: ProdutoCreateNestedOneWithoutAparelhosInput
    assistencias?: AssistenciaCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoUncheckedCreateWithoutVendaItemInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    produtoId: number
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutAparelhoInput
  }

  export type AparelhoCreateOrConnectWithoutVendaItemInput = {
    where: AparelhoWhereUniqueInput
    create: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput>
  }

  export type AparelhoCreateManyVendaItemInputEnvelope = {
    data: AparelhoCreateManyVendaItemInput | AparelhoCreateManyVendaItemInput[]
  }

  export type VendaUpsertWithoutItensInput = {
    update: XOR<VendaUpdateWithoutItensInput, VendaUncheckedUpdateWithoutItensInput>
    create: XOR<VendaCreateWithoutItensInput, VendaUncheckedCreateWithoutItensInput>
    where?: VendaWhereInput
  }

  export type VendaUpdateToOneWithWhereWithoutItensInput = {
    where?: VendaWhereInput
    data: XOR<VendaUpdateWithoutItensInput, VendaUncheckedUpdateWithoutItensInput>
  }

  export type VendaUpdateWithoutItensInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneWithoutVendasLegadasNestedInput
    pagamentos?: PagamentoUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateWithoutItensInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: NullableIntFieldUpdateOperationsInput | number | null
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    pagamentos?: PagamentoUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type ProdutoUpsertWithoutVendasInput = {
    update: XOR<ProdutoUpdateWithoutVendasInput, ProdutoUncheckedUpdateWithoutVendasInput>
    create: XOR<ProdutoCreateWithoutVendasInput, ProdutoUncheckedCreateWithoutVendasInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutVendasInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutVendasInput, ProdutoUncheckedUpdateWithoutVendasInput>
  }

  export type ProdutoUpdateWithoutVendasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutVendasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type AparelhoUpsertWithWhereUniqueWithoutVendaItemInput = {
    where: AparelhoWhereUniqueInput
    update: XOR<AparelhoUpdateWithoutVendaItemInput, AparelhoUncheckedUpdateWithoutVendaItemInput>
    create: XOR<AparelhoCreateWithoutVendaItemInput, AparelhoUncheckedCreateWithoutVendaItemInput>
  }

  export type AparelhoUpdateWithWhereUniqueWithoutVendaItemInput = {
    where: AparelhoWhereUniqueInput
    data: XOR<AparelhoUpdateWithoutVendaItemInput, AparelhoUncheckedUpdateWithoutVendaItemInput>
  }

  export type AparelhoUpdateManyWithWhereWithoutVendaItemInput = {
    where: AparelhoScalarWhereInput
    data: XOR<AparelhoUpdateManyMutationInput, AparelhoUncheckedUpdateManyWithoutVendaItemInput>
  }

  export type VendaCreateWithoutPagamentosInput = {
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    produto?: ProdutoCreateNestedOneWithoutVendasLegadasInput
    itens?: VendaItemCreateNestedManyWithoutVendaInput
  }

  export type VendaUncheckedCreateWithoutPagamentosInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    produtoId?: number | null
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
    itens?: VendaItemUncheckedCreateNestedManyWithoutVendaInput
  }

  export type VendaCreateOrConnectWithoutPagamentosInput = {
    where: VendaWhereUniqueInput
    create: XOR<VendaCreateWithoutPagamentosInput, VendaUncheckedCreateWithoutPagamentosInput>
  }

  export type VendaUpsertWithoutPagamentosInput = {
    update: XOR<VendaUpdateWithoutPagamentosInput, VendaUncheckedUpdateWithoutPagamentosInput>
    create: XOR<VendaCreateWithoutPagamentosInput, VendaUncheckedCreateWithoutPagamentosInput>
    where?: VendaWhereInput
  }

  export type VendaUpdateToOneWithWhereWithoutPagamentosInput = {
    where?: VendaWhereInput
    data: XOR<VendaUpdateWithoutPagamentosInput, VendaUncheckedUpdateWithoutPagamentosInput>
  }

  export type VendaUpdateWithoutPagamentosInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    produto?: ProdutoUpdateOneWithoutVendasLegadasNestedInput
    itens?: VendaItemUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateWithoutPagamentosInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: NullableIntFieldUpdateOperationsInput | number | null
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    itens?: VendaItemUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type ProdutoCreateWithoutGarantiasInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutGarantiasInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    assistencias?: AssistenciaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutGarantiasInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutGarantiasInput, ProdutoUncheckedCreateWithoutGarantiasInput>
  }

  export type ProdutoUpsertWithoutGarantiasInput = {
    update: XOR<ProdutoUpdateWithoutGarantiasInput, ProdutoUncheckedUpdateWithoutGarantiasInput>
    create: XOR<ProdutoCreateWithoutGarantiasInput, ProdutoUncheckedCreateWithoutGarantiasInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutGarantiasInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutGarantiasInput, ProdutoUncheckedUpdateWithoutGarantiasInput>
  }

  export type ProdutoUpdateWithoutGarantiasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutGarantiasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    assistencias?: AssistenciaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoCreateWithoutAssistenciasInput = {
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaCreateNestedManyWithoutProdutoInput
    lotes?: LoteCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoUncheckedCreateWithoutAssistenciasInput = {
    id?: number
    nome: string
    quantidade?: number
    createdAt?: Date | string
    precoVendaUsd?: number | null
    precoVendaBrl?: number | null
    tipoPreco?: string | null
    aparelhos?: AparelhoUncheckedCreateNestedManyWithoutProdutoInput
    garantias?: GarantiaUncheckedCreateNestedManyWithoutProdutoInput
    lotes?: LoteUncheckedCreateNestedManyWithoutProdutoInput
    vendasLegadas?: VendaUncheckedCreateNestedManyWithoutProdutoInput
    vendas?: VendaItemUncheckedCreateNestedManyWithoutProdutoInput
  }

  export type ProdutoCreateOrConnectWithoutAssistenciasInput = {
    where: ProdutoWhereUniqueInput
    create: XOR<ProdutoCreateWithoutAssistenciasInput, ProdutoUncheckedCreateWithoutAssistenciasInput>
  }

  export type AparelhoCreateWithoutAssistenciasInput = {
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    lote: LoteCreateNestedOneWithoutAparelhosInput
    produto: ProdutoCreateNestedOneWithoutAparelhosInput
    vendaItem?: VendaItemCreateNestedOneWithoutAparelhosInput
  }

  export type AparelhoUncheckedCreateWithoutAssistenciasInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    produtoId: number
    vendaItemId?: number | null
  }

  export type AparelhoCreateOrConnectWithoutAssistenciasInput = {
    where: AparelhoWhereUniqueInput
    create: XOR<AparelhoCreateWithoutAssistenciasInput, AparelhoUncheckedCreateWithoutAssistenciasInput>
  }

  export type ProdutoUpsertWithoutAssistenciasInput = {
    update: XOR<ProdutoUpdateWithoutAssistenciasInput, ProdutoUncheckedUpdateWithoutAssistenciasInput>
    create: XOR<ProdutoCreateWithoutAssistenciasInput, ProdutoUncheckedCreateWithoutAssistenciasInput>
    where?: ProdutoWhereInput
  }

  export type ProdutoUpdateToOneWithWhereWithoutAssistenciasInput = {
    where?: ProdutoWhereInput
    data: XOR<ProdutoUpdateWithoutAssistenciasInput, ProdutoUncheckedUpdateWithoutAssistenciasInput>
  }

  export type ProdutoUpdateWithoutAssistenciasInput = {
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUpdateManyWithoutProdutoNestedInput
  }

  export type ProdutoUncheckedUpdateWithoutAssistenciasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    quantidade?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    precoVendaUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoVendaBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoPreco?: NullableStringFieldUpdateOperationsInput | string | null
    aparelhos?: AparelhoUncheckedUpdateManyWithoutProdutoNestedInput
    garantias?: GarantiaUncheckedUpdateManyWithoutProdutoNestedInput
    lotes?: LoteUncheckedUpdateManyWithoutProdutoNestedInput
    vendasLegadas?: VendaUncheckedUpdateManyWithoutProdutoNestedInput
    vendas?: VendaItemUncheckedUpdateManyWithoutProdutoNestedInput
  }

  export type AparelhoUpsertWithoutAssistenciasInput = {
    update: XOR<AparelhoUpdateWithoutAssistenciasInput, AparelhoUncheckedUpdateWithoutAssistenciasInput>
    create: XOR<AparelhoCreateWithoutAssistenciasInput, AparelhoUncheckedCreateWithoutAssistenciasInput>
    where?: AparelhoWhereInput
  }

  export type AparelhoUpdateToOneWithWhereWithoutAssistenciasInput = {
    where?: AparelhoWhereInput
    data: XOR<AparelhoUpdateWithoutAssistenciasInput, AparelhoUncheckedUpdateWithoutAssistenciasInput>
  }

  export type AparelhoUpdateWithoutAssistenciasInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutAparelhosNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutAparelhosNestedInput
    vendaItem?: VendaItemUpdateOneWithoutAparelhosNestedInput
  }

  export type AparelhoUncheckedUpdateWithoutAssistenciasInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AparelhoCreateManyProdutoInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    vendaItemId?: number | null
  }

  export type AssistenciaCreateManyProdutoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    aparelhoId?: number | null
  }

  export type GarantiaCreateManyProdutoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    tipo: string
    inicio: Date | string
    fim: Date | string
    observacao?: string | null
    createdAt?: Date | string
  }

  export type LoteCreateManyProdutoInput = {
    id?: number
    fornecedor?: string | null
    precoCompraUsd?: number | null
    precoCompraBrl?: number | null
    tipoCusto?: string | null
    quantidade?: number
    observacao?: string | null
    createdAt?: Date | string
  }

  export type VendaCreateManyProdutoInput = {
    id?: number
    cliente: string
    taxa?: number | null
    taxaFechada?: boolean
    dataVenda?: Date | string
    createdAt?: Date | string
    quantidade?: number | null
    valorVenda?: number | null
    precoCompraUsd?: number | null
    formaPagamento?: string | null
    estadoFatura?: string | null
    desconto?: number
  }

  export type VendaItemCreateManyProdutoInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    vendaId: number
  }

  export type AparelhoUpdateWithoutProdutoInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutAparelhosNestedInput
    vendaItem?: VendaItemUpdateOneWithoutAparelhosNestedInput
    assistencias?: AssistenciaUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
    assistencias?: AssistenciaUncheckedUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssistenciaUpdateWithoutProdutoInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aparelho?: AparelhoUpdateOneWithoutAssistenciasNestedInput
  }

  export type AssistenciaUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aparelhoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssistenciaUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aparelhoId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type GarantiaUpdateWithoutProdutoInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GarantiaUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GarantiaUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    tipo?: StringFieldUpdateOperationsInput | string
    inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fim?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoteUpdateWithoutProdutoInput = {
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aparelhos?: AparelhoUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aparelhos?: AparelhoUncheckedUpdateManyWithoutLoteNestedInput
  }

  export type LoteUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    fornecedor?: NullableStringFieldUpdateOperationsInput | string | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraBrl?: NullableFloatFieldUpdateOperationsInput | number | null
    tipoCusto?: NullableStringFieldUpdateOperationsInput | string | null
    quantidade?: IntFieldUpdateOperationsInput | number
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendaUpdateWithoutProdutoInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    itens?: VendaItemUpdateManyWithoutVendaNestedInput
    pagamentos?: PagamentoUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
    itens?: VendaItemUncheckedUpdateManyWithoutVendaNestedInput
    pagamentos?: PagamentoUncheckedUpdateManyWithoutVendaNestedInput
  }

  export type VendaUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    taxa?: NullableFloatFieldUpdateOperationsInput | number | null
    taxaFechada?: BoolFieldUpdateOperationsInput | boolean
    dataVenda?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quantidade?: NullableIntFieldUpdateOperationsInput | number | null
    valorVenda?: NullableFloatFieldUpdateOperationsInput | number | null
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    formaPagamento?: NullableStringFieldUpdateOperationsInput | string | null
    estadoFatura?: NullableStringFieldUpdateOperationsInput | string | null
    desconto?: FloatFieldUpdateOperationsInput | number
  }

  export type VendaItemUpdateWithoutProdutoInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venda?: VendaUpdateOneRequiredWithoutItensNestedInput
    aparelhos?: AparelhoUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemUncheckedUpdateWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
    aparelhos?: AparelhoUncheckedUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemUncheckedUpdateManyWithoutProdutoInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendaId?: IntFieldUpdateOperationsInput | number
  }

  export type AparelhoCreateManyLoteInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    produtoId: number
    vendaItemId?: number | null
  }

  export type AparelhoUpdateWithoutLoteInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutAparelhosNestedInput
    vendaItem?: VendaItemUpdateOneWithoutAparelhosNestedInput
    assistencias?: AssistenciaUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateWithoutLoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
    assistencias?: AssistenciaUncheckedUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateManyWithoutLoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    vendaItemId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssistenciaCreateManyAparelhoInput = {
    id?: number
    cliente: string
    telefone?: string | null
    problema: string
    observacao?: string | null
    status?: string
    custo?: number
    dataEntrada?: Date | string
    dataSaida?: Date | string | null
    createdAt?: Date | string
    produtoId: number
  }

  export type AssistenciaUpdateWithoutAparelhoInput = {
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutAssistenciasNestedInput
  }

  export type AssistenciaUncheckedUpdateWithoutAparelhoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type AssistenciaUncheckedUpdateManyWithoutAparelhoInput = {
    id?: IntFieldUpdateOperationsInput | number
    cliente?: StringFieldUpdateOperationsInput | string
    telefone?: NullableStringFieldUpdateOperationsInput | string | null
    problema?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    custo?: FloatFieldUpdateOperationsInput | number
    dataEntrada?: DateTimeFieldUpdateOperationsInput | Date | string
    dataSaida?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type VendaItemCreateManyVendaInput = {
    id?: number
    quantidade: number
    valorUnitario: number
    total: number
    precoCompraUsd?: number | null
    custoTotal?: number | null
    createdAt?: Date | string
    produtoId: number
  }

  export type PagamentoCreateManyVendaInput = {
    id?: number
    valor: number
    desconto?: number
    forma?: string | null
    observacao?: string | null
    createdAt?: Date | string
  }

  export type VendaItemUpdateWithoutVendaInput = {
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produto?: ProdutoUpdateOneRequiredWithoutVendasNestedInput
    aparelhos?: AparelhoUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemUncheckedUpdateWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
    aparelhos?: AparelhoUncheckedUpdateManyWithoutVendaItemNestedInput
  }

  export type VendaItemUncheckedUpdateManyWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantidade?: IntFieldUpdateOperationsInput | number
    valorUnitario?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    precoCompraUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    custoTotal?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    produtoId?: IntFieldUpdateOperationsInput | number
  }

  export type PagamentoUpdateWithoutVendaInput = {
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagamentoUncheckedUpdateWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagamentoUncheckedUpdateManyWithoutVendaInput = {
    id?: IntFieldUpdateOperationsInput | number
    valor?: FloatFieldUpdateOperationsInput | number
    desconto?: FloatFieldUpdateOperationsInput | number
    forma?: NullableStringFieldUpdateOperationsInput | string | null
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AparelhoCreateManyVendaItemInput = {
    id?: number
    imei: string
    vendido?: boolean
    createdAt?: Date | string
    loteId: number
    produtoId: number
  }

  export type AparelhoUpdateWithoutVendaItemInput = {
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lote?: LoteUpdateOneRequiredWithoutAparelhosNestedInput
    produto?: ProdutoUpdateOneRequiredWithoutAparelhosNestedInput
    assistencias?: AssistenciaUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateWithoutVendaItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
    assistencias?: AssistenciaUncheckedUpdateManyWithoutAparelhoNestedInput
  }

  export type AparelhoUncheckedUpdateManyWithoutVendaItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    imei?: StringFieldUpdateOperationsInput | string
    vendido?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    loteId?: IntFieldUpdateOperationsInput | number
    produtoId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}