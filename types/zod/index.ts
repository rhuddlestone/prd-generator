import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','clerkUserId','email','name','createdAt','updatedAt']);

export const PRDScalarFieldEnumSchema = z.enum(['id','title','projectDescription','techStack','status','createdAt','updatedAt','authorId','lastEditedAt','pageCount','isPublic']);

export const DocumentContentScalarFieldEnumSchema = z.enum(['id','markdownContent','htmlContent','prdId','createdAt','updatedAt']);

export const SectionScalarFieldEnumSchema = z.enum(['id','title','order','content','prdId','createdAt','updatedAt']);

export const VersionScalarFieldEnumSchema = z.enum(['id','versionNumber','content','markdownContent','createdAt','prdId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','authorId','prdId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const PrdStatusSchema = z.enum(['DRAFT','COMPLETED','ARCHIVED']);

export type PrdStatusType = `${z.infer<typeof PrdStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PRD SCHEMA
/////////////////////////////////////////

export const PRDSchema = z.object({
  status: PrdStatusSchema,
  id: z.string().cuid(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date(),
  pageCount: z.number().int(),
  isPublic: z.boolean(),
})

export type PRD = z.infer<typeof PRDSchema>

/////////////////////////////////////////
// DOCUMENT CONTENT SCHEMA
/////////////////////////////////////////

export const DocumentContentSchema = z.object({
  id: z.string().cuid(),
  markdownContent: z.string(),
  htmlContent: z.string().nullable(),
  prdId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type DocumentContent = z.infer<typeof DocumentContentSchema>

/////////////////////////////////////////
// SECTION SCHEMA
/////////////////////////////////////////

export const SectionSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  prdId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Section = z.infer<typeof SectionSchema>

/////////////////////////////////////////
// VERSION SCHEMA
/////////////////////////////////////////

export const VersionSchema = z.object({
  id: z.string().cuid(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date(),
  prdId: z.string(),
})

export type Version = z.infer<typeof VersionSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  authorId: z.string(),
  prdId: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  prds: z.union([z.boolean(),z.lazy(() => PRDFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  prds: z.boolean().optional(),
  comments: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  clerkUserId: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  prds: z.union([z.boolean(),z.lazy(() => PRDFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRD
//------------------------------------------------------

export const PRDIncludeSchema: z.ZodType<Prisma.PRDInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  versions: z.union([z.boolean(),z.lazy(() => VersionFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  sections: z.union([z.boolean(),z.lazy(() => SectionFindManyArgsSchema)]).optional(),
  currentContent: z.union([z.boolean(),z.lazy(() => DocumentContentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PRDCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PRDArgsSchema: z.ZodType<Prisma.PRDDefaultArgs> = z.object({
  select: z.lazy(() => PRDSelectSchema).optional(),
  include: z.lazy(() => PRDIncludeSchema).optional(),
}).strict();

export const PRDCountOutputTypeArgsSchema: z.ZodType<Prisma.PRDCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PRDCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PRDCountOutputTypeSelectSchema: z.ZodType<Prisma.PRDCountOutputTypeSelect> = z.object({
  versions: z.boolean().optional(),
  comments: z.boolean().optional(),
  sections: z.boolean().optional(),
}).strict();

export const PRDSelectSchema: z.ZodType<Prisma.PRDSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  projectDescription: z.boolean().optional(),
  techStack: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  lastEditedAt: z.boolean().optional(),
  pageCount: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  versions: z.union([z.boolean(),z.lazy(() => VersionFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  sections: z.union([z.boolean(),z.lazy(() => SectionFindManyArgsSchema)]).optional(),
  currentContent: z.union([z.boolean(),z.lazy(() => DocumentContentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PRDCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DOCUMENT CONTENT
//------------------------------------------------------

export const DocumentContentIncludeSchema: z.ZodType<Prisma.DocumentContentInclude> = z.object({
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

export const DocumentContentArgsSchema: z.ZodType<Prisma.DocumentContentDefaultArgs> = z.object({
  select: z.lazy(() => DocumentContentSelectSchema).optional(),
  include: z.lazy(() => DocumentContentIncludeSchema).optional(),
}).strict();

export const DocumentContentSelectSchema: z.ZodType<Prisma.DocumentContentSelect> = z.object({
  id: z.boolean().optional(),
  markdownContent: z.boolean().optional(),
  htmlContent: z.boolean().optional(),
  prdId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

// SECTION
//------------------------------------------------------

export const SectionIncludeSchema: z.ZodType<Prisma.SectionInclude> = z.object({
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

export const SectionArgsSchema: z.ZodType<Prisma.SectionDefaultArgs> = z.object({
  select: z.lazy(() => SectionSelectSchema).optional(),
  include: z.lazy(() => SectionIncludeSchema).optional(),
}).strict();

export const SectionSelectSchema: z.ZodType<Prisma.SectionSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  order: z.boolean().optional(),
  content: z.boolean().optional(),
  prdId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

// VERSION
//------------------------------------------------------

export const VersionIncludeSchema: z.ZodType<Prisma.VersionInclude> = z.object({
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

export const VersionArgsSchema: z.ZodType<Prisma.VersionDefaultArgs> = z.object({
  select: z.lazy(() => VersionSelectSchema).optional(),
  include: z.lazy(() => VersionIncludeSchema).optional(),
}).strict();

export const VersionSelectSchema: z.ZodType<Prisma.VersionSelect> = z.object({
  id: z.boolean().optional(),
  versionNumber: z.boolean().optional(),
  content: z.boolean().optional(),
  markdownContent: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  prdId: z.boolean().optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  authorId: z.boolean().optional(),
  prdId: z.boolean().optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  prd: z.union([z.boolean(),z.lazy(() => PRDArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clerkUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prds: z.lazy(() => PRDListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  prds: z.lazy(() => PRDOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    clerkUserId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    clerkUserId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    clerkUserId: z.string(),
    email: z.string(),
  }),
  z.object({
    clerkUserId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prds: z.lazy(() => PRDListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clerkUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PRDWhereInputSchema: z.ZodType<Prisma.PRDWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumPrdStatusFilterSchema),z.lazy(() => PrdStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastEditedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pageCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  versions: z.lazy(() => VersionListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  sections: z.lazy(() => SectionListRelationFilterSchema).optional(),
  currentContent: z.union([ z.lazy(() => DocumentContentNullableRelationFilterSchema),z.lazy(() => DocumentContentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PRDOrderByWithRelationInputSchema: z.ZodType<Prisma.PRDOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  lastEditedAt: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  versions: z.lazy(() => VersionOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  sections: z.lazy(() => SectionOrderByRelationAggregateInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentOrderByWithRelationInputSchema).optional()
}).strict();

export const PRDWhereUniqueInputSchema: z.ZodType<Prisma.PRDWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDWhereInputSchema),z.lazy(() => PRDWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumPrdStatusFilterSchema),z.lazy(() => PrdStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastEditedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pageCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  versions: z.lazy(() => VersionListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  sections: z.lazy(() => SectionListRelationFilterSchema).optional(),
  currentContent: z.union([ z.lazy(() => DocumentContentNullableRelationFilterSchema),z.lazy(() => DocumentContentWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PRDOrderByWithAggregationInputSchema: z.ZodType<Prisma.PRDOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  lastEditedAt: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PRDCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PRDAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PRDMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PRDMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PRDSumOrderByAggregateInputSchema).optional()
}).strict();

export const PRDScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PRDScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PRDScalarWhereWithAggregatesInputSchema),z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDScalarWhereWithAggregatesInputSchema),z.lazy(() => PRDScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumPrdStatusWithAggregatesFilterSchema),z.lazy(() => PrdStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastEditedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pageCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const DocumentContentWhereInputSchema: z.ZodType<Prisma.DocumentContentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentContentWhereInputSchema),z.lazy(() => DocumentContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentContentWhereInputSchema),z.lazy(() => DocumentContentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  htmlContent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict();

export const DocumentContentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentContentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  htmlContent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  prd: z.lazy(() => PRDOrderByWithRelationInputSchema).optional()
}).strict();

export const DocumentContentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentContentWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    prdId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    prdId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  prdId: z.string().optional(),
  AND: z.union([ z.lazy(() => DocumentContentWhereInputSchema),z.lazy(() => DocumentContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentContentWhereInputSchema),z.lazy(() => DocumentContentWhereInputSchema).array() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  htmlContent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict());

export const DocumentContentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentContentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  htmlContent: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentContentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentContentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentContentMinOrderByAggregateInputSchema).optional()
}).strict();

export const DocumentContentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentContentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentContentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentContentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentContentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  htmlContent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  prdId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SectionWhereInputSchema: z.ZodType<Prisma.SectionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SectionWhereInputSchema),z.lazy(() => SectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SectionWhereInputSchema),z.lazy(() => SectionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict();

export const SectionOrderByWithRelationInputSchema: z.ZodType<Prisma.SectionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  prd: z.lazy(() => PRDOrderByWithRelationInputSchema).optional()
}).strict();

export const SectionWhereUniqueInputSchema: z.ZodType<Prisma.SectionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    prdId_order: z.lazy(() => SectionPrdIdOrderCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    prdId_order: z.lazy(() => SectionPrdIdOrderCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  prdId_order: z.lazy(() => SectionPrdIdOrderCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SectionWhereInputSchema),z.lazy(() => SectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SectionWhereInputSchema),z.lazy(() => SectionWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict());

export const SectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SectionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SectionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SectionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SectionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SectionScalarWhereWithAggregatesInputSchema),z.lazy(() => SectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SectionScalarWhereWithAggregatesInputSchema),z.lazy(() => SectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VersionWhereInputSchema: z.ZodType<Prisma.VersionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VersionWhereInputSchema),z.lazy(() => VersionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VersionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VersionWhereInputSchema),z.lazy(() => VersionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict();

export const VersionOrderByWithRelationInputSchema: z.ZodType<Prisma.VersionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  prd: z.lazy(() => PRDOrderByWithRelationInputSchema).optional()
}).strict();

export const VersionWhereUniqueInputSchema: z.ZodType<Prisma.VersionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    prdId_versionNumber: z.lazy(() => VersionPrdIdVersionNumberCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    prdId_versionNumber: z.lazy(() => VersionPrdIdVersionNumberCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  prdId_versionNumber: z.lazy(() => VersionPrdIdVersionNumberCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VersionWhereInputSchema),z.lazy(() => VersionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VersionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VersionWhereInputSchema),z.lazy(() => VersionWhereInputSchema).array() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict());

export const VersionOrderByWithAggregationInputSchema: z.ZodType<Prisma.VersionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VersionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VersionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VersionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VersionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VersionSumOrderByAggregateInputSchema).optional()
}).strict();

export const VersionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VersionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VersionScalarWhereWithAggregatesInputSchema),z.lazy(() => VersionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VersionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VersionScalarWhereWithAggregatesInputSchema),z.lazy(() => VersionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  prdId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  prd: z.lazy(() => PRDOrderByWithRelationInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  prd: z.union([ z.lazy(() => PRDRelationFilterSchema),z.lazy(() => PRDWhereInputSchema) ]).optional(),
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDCreateInputSchema: z.ZodType<Prisma.PRDCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  versions: z.lazy(() => VersionCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateInputSchema: z.ZodType<Prisma.PRDUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUpdateInputSchema: z.ZodType<Prisma.PRDUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  versions: z.lazy(() => VersionUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDCreateManyInputSchema: z.ZodType<Prisma.PRDCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional()
}).strict();

export const PRDUpdateManyMutationInputSchema: z.ZodType<Prisma.PRDUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentContentCreateInputSchema: z.ZodType<Prisma.DocumentContentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  markdownContent: z.string(),
  htmlContent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutCurrentContentInputSchema)
}).strict();

export const DocumentContentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentContentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  markdownContent: z.string(),
  htmlContent: z.string().optional().nullable(),
  prdId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentContentUpdateInputSchema: z.ZodType<Prisma.DocumentContentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutCurrentContentNestedInputSchema).optional()
}).strict();

export const DocumentContentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentContentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentContentCreateManyInputSchema: z.ZodType<Prisma.DocumentContentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  markdownContent: z.string(),
  htmlContent: z.string().optional().nullable(),
  prdId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentContentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentContentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentContentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentContentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionCreateInputSchema: z.ZodType<Prisma.SectionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutSectionsInputSchema)
}).strict();

export const SectionUncheckedCreateInputSchema: z.ZodType<Prisma.SectionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  prdId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SectionUpdateInputSchema: z.ZodType<Prisma.SectionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutSectionsNestedInputSchema).optional()
}).strict();

export const SectionUncheckedUpdateInputSchema: z.ZodType<Prisma.SectionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionCreateManyInputSchema: z.ZodType<Prisma.SectionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  prdId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SectionUpdateManyMutationInputSchema: z.ZodType<Prisma.SectionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SectionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionCreateInputSchema: z.ZodType<Prisma.VersionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutVersionsInputSchema)
}).strict();

export const VersionUncheckedCreateInputSchema: z.ZodType<Prisma.VersionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional(),
  prdId: z.string()
}).strict();

export const VersionUpdateInputSchema: z.ZodType<Prisma.VersionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutVersionsNestedInputSchema).optional()
}).strict();

export const VersionUncheckedUpdateInputSchema: z.ZodType<Prisma.VersionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionCreateManyInputSchema: z.ZodType<Prisma.VersionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional(),
  prdId: z.string()
}).strict();

export const VersionUpdateManyMutationInputSchema: z.ZodType<Prisma.VersionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VersionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  prd: z.lazy(() => PRDCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  prdId: z.string()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  prdId: z.string()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PRDListRelationFilterSchema: z.ZodType<Prisma.PRDListRelationFilter> = z.object({
  every: z.lazy(() => PRDWhereInputSchema).optional(),
  some: z.lazy(() => PRDWhereInputSchema).optional(),
  none: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const PRDOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PRDOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkUserId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const EnumPrdStatusFilterSchema: z.ZodType<Prisma.EnumPrdStatusFilter> = z.object({
  equals: z.lazy(() => PrdStatusSchema).optional(),
  in: z.lazy(() => PrdStatusSchema).array().optional(),
  notIn: z.lazy(() => PrdStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => NestedEnumPrdStatusFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const VersionListRelationFilterSchema: z.ZodType<Prisma.VersionListRelationFilter> = z.object({
  every: z.lazy(() => VersionWhereInputSchema).optional(),
  some: z.lazy(() => VersionWhereInputSchema).optional(),
  none: z.lazy(() => VersionWhereInputSchema).optional()
}).strict();

export const SectionListRelationFilterSchema: z.ZodType<Prisma.SectionListRelationFilter> = z.object({
  every: z.lazy(() => SectionWhereInputSchema).optional(),
  some: z.lazy(() => SectionWhereInputSchema).optional(),
  none: z.lazy(() => SectionWhereInputSchema).optional()
}).strict();

export const DocumentContentNullableRelationFilterSchema: z.ZodType<Prisma.DocumentContentNullableRelationFilter> = z.object({
  is: z.lazy(() => DocumentContentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DocumentContentWhereInputSchema).optional().nullable()
}).strict();

export const VersionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VersionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SectionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDCountOrderByAggregateInputSchema: z.ZodType<Prisma.PRDCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  techStack: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  lastEditedAt: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PRDAvgOrderByAggregateInput> = z.object({
  pageCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PRDMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  lastEditedAt: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDMinOrderByAggregateInputSchema: z.ZodType<Prisma.PRDMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  lastEditedAt: z.lazy(() => SortOrderSchema).optional(),
  pageCount: z.lazy(() => SortOrderSchema).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDSumOrderByAggregateInputSchema: z.ZodType<Prisma.PRDSumOrderByAggregateInput> = z.object({
  pageCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPrdStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPrdStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrdStatusSchema).optional(),
  in: z.lazy(() => PrdStatusSchema).array().optional(),
  notIn: z.lazy(() => PrdStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => NestedEnumPrdStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrdStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrdStatusFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PRDRelationFilterSchema: z.ZodType<Prisma.PRDRelationFilter> = z.object({
  is: z.lazy(() => PRDWhereInputSchema).optional(),
  isNot: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DocumentContentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentContentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  htmlContent: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentContentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentContentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  htmlContent: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentContentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentContentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  htmlContent: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const SectionPrdIdOrderCompoundUniqueInputSchema: z.ZodType<Prisma.SectionPrdIdOrderCompoundUniqueInput> = z.object({
  prdId: z.string(),
  order: z.number()
}).strict();

export const SectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SectionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SectionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SectionAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SectionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SectionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SectionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SectionSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VersionPrdIdVersionNumberCompoundUniqueInputSchema: z.ZodType<Prisma.VersionPrdIdVersionNumberCompoundUniqueInput> = z.object({
  prdId: z.string(),
  versionNumber: z.number()
}).strict();

export const VersionCountOrderByAggregateInputSchema: z.ZodType<Prisma.VersionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VersionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VersionAvgOrderByAggregateInput> = z.object({
  versionNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VersionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VersionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VersionMinOrderByAggregateInputSchema: z.ZodType<Prisma.VersionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  versionNumber: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  markdownContent: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VersionSumOrderByAggregateInputSchema: z.ZodType<Prisma.VersionSumOrderByAggregateInput> = z.object({
  versionNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  prdId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PRDCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PRDCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDCreateWithoutAuthorInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PRDUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDCreateWithoutAuthorInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PRDUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PRDUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDCreateWithoutAuthorInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PRDUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PRDUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PRDUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PRDUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PRDUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PRDUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PRDUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDCreateWithoutAuthorInputSchema).array(),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PRDCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PRDUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PRDUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PRDCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PRDWhereUniqueInputSchema),z.lazy(() => PRDWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PRDUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PRDUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PRDUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PRDUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PRDCreatetechStackInputSchema: z.ZodType<Prisma.PRDCreatetechStackInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPrdsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrdsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const VersionCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.VersionCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionCreateWithoutPrdInputSchema).array(),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VersionCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentCreateWithoutPrdInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SectionCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.SectionCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionCreateWithoutPrdInputSchema).array(),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SectionCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentContentCreateNestedOneWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentCreateNestedOneWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentContentCreateOrConnectWithoutPrdInputSchema).optional(),
  connect: z.lazy(() => DocumentContentWhereUniqueInputSchema).optional()
}).strict();

export const VersionUncheckedCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.VersionUncheckedCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionCreateWithoutPrdInputSchema).array(),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VersionCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentCreateWithoutPrdInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SectionUncheckedCreateNestedManyWithoutPrdInputSchema: z.ZodType<Prisma.SectionUncheckedCreateNestedManyWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionCreateWithoutPrdInputSchema).array(),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SectionCreateManyPrdInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUncheckedCreateNestedOneWithoutPrdInput> = z.object({
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentContentCreateOrConnectWithoutPrdInputSchema).optional(),
  connect: z.lazy(() => DocumentContentWhereUniqueInputSchema).optional()
}).strict();

export const PRDUpdatetechStackInputSchema: z.ZodType<Prisma.PRDUpdatetechStackInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const EnumPrdStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPrdStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrdStatusSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const UserUpdateOneRequiredWithoutPrdsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPrdsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPrdsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPrdsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPrdsInputSchema),z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]).optional(),
}).strict();

export const VersionUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.VersionUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionCreateWithoutPrdInputSchema).array(),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VersionUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => VersionUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VersionCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VersionUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => VersionUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VersionUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => VersionUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VersionScalarWhereInputSchema),z.lazy(() => VersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentCreateWithoutPrdInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SectionUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.SectionUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionCreateWithoutPrdInputSchema).array(),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SectionUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => SectionUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SectionCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SectionUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => SectionUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SectionUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => SectionUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SectionScalarWhereInputSchema),z.lazy(() => SectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentContentUpdateOneWithoutPrdNestedInputSchema: z.ZodType<Prisma.DocumentContentUpdateOneWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentContentCreateOrConnectWithoutPrdInputSchema).optional(),
  upsert: z.lazy(() => DocumentContentUpsertWithoutPrdInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DocumentContentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DocumentContentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DocumentContentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentContentUpdateToOneWithWhereWithoutPrdInputSchema),z.lazy(() => DocumentContentUpdateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedUpdateWithoutPrdInputSchema) ]).optional(),
}).strict();

export const VersionUncheckedUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.VersionUncheckedUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionCreateWithoutPrdInputSchema).array(),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => VersionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VersionUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => VersionUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VersionCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VersionWhereUniqueInputSchema),z.lazy(() => VersionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VersionUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => VersionUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VersionUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => VersionUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VersionScalarWhereInputSchema),z.lazy(() => VersionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentCreateWithoutPrdInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema),z.lazy(() => CommentCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SectionUncheckedUpdateManyWithoutPrdNestedInputSchema: z.ZodType<Prisma.SectionUncheckedUpdateManyWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionCreateWithoutPrdInputSchema).array(),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema),z.lazy(() => SectionCreateOrConnectWithoutPrdInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SectionUpsertWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => SectionUpsertWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SectionCreateManyPrdInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SectionWhereUniqueInputSchema),z.lazy(() => SectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SectionUpdateWithWhereUniqueWithoutPrdInputSchema),z.lazy(() => SectionUpdateWithWhereUniqueWithoutPrdInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SectionUpdateManyWithWhereWithoutPrdInputSchema),z.lazy(() => SectionUpdateManyWithWhereWithoutPrdInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SectionScalarWhereInputSchema),z.lazy(() => SectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema: z.ZodType<Prisma.DocumentContentUncheckedUpdateOneWithoutPrdNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentContentCreateOrConnectWithoutPrdInputSchema).optional(),
  upsert: z.lazy(() => DocumentContentUpsertWithoutPrdInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => DocumentContentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => DocumentContentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => DocumentContentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentContentUpdateToOneWithWhereWithoutPrdInputSchema),z.lazy(() => DocumentContentUpdateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedUpdateWithoutPrdInputSchema) ]).optional(),
}).strict();

export const PRDCreateNestedOneWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDCreateNestedOneWithoutCurrentContentInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCurrentContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutCurrentContentInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const PRDUpdateOneRequiredWithoutCurrentContentNestedInputSchema: z.ZodType<Prisma.PRDUpdateOneRequiredWithoutCurrentContentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCurrentContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutCurrentContentInputSchema).optional(),
  upsert: z.lazy(() => PRDUpsertWithoutCurrentContentInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PRDUpdateToOneWithWhereWithoutCurrentContentInputSchema),z.lazy(() => PRDUpdateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCurrentContentInputSchema) ]).optional(),
}).strict();

export const PRDCreateNestedOneWithoutSectionsInputSchema: z.ZodType<Prisma.PRDCreateNestedOneWithoutSectionsInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutSectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutSectionsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional()
}).strict();

export const PRDUpdateOneRequiredWithoutSectionsNestedInputSchema: z.ZodType<Prisma.PRDUpdateOneRequiredWithoutSectionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutSectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutSectionsInputSchema).optional(),
  upsert: z.lazy(() => PRDUpsertWithoutSectionsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PRDUpdateToOneWithWhereWithoutSectionsInputSchema),z.lazy(() => PRDUpdateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutSectionsInputSchema) ]).optional(),
}).strict();

export const PRDCreateNestedOneWithoutVersionsInputSchema: z.ZodType<Prisma.PRDCreateNestedOneWithoutVersionsInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutVersionsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional()
}).strict();

export const PRDUpdateOneRequiredWithoutVersionsNestedInputSchema: z.ZodType<Prisma.PRDUpdateOneRequiredWithoutVersionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutVersionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutVersionsInputSchema).optional(),
  upsert: z.lazy(() => PRDUpsertWithoutVersionsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PRDUpdateToOneWithWhereWithoutVersionsInputSchema),z.lazy(() => PRDUpdateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutVersionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PRDCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PRDCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const PRDUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PRDUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PRDCreateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PRDCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PRDUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PRDWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PRDUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PRDUpdateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumPrdStatusFilterSchema: z.ZodType<Prisma.NestedEnumPrdStatusFilter> = z.object({
  equals: z.lazy(() => PrdStatusSchema).optional(),
  in: z.lazy(() => PrdStatusSchema).array().optional(),
  notIn: z.lazy(() => PrdStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => NestedEnumPrdStatusFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPrdStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPrdStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrdStatusSchema).optional(),
  in: z.lazy(() => PrdStatusSchema).array().optional(),
  notIn: z.lazy(() => PrdStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => NestedEnumPrdStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrdStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrdStatusFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PRDCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PRDCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PRDCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PRDCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PRDCreateManyAuthorInputSchema),z.lazy(() => PRDCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prd: z.lazy(() => PRDCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prdId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema),z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PRDUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PRDUpdateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PRDUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PRDUpdateWithoutAuthorInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PRDUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PRDScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PRDUpdateManyMutationInputSchema),z.lazy(() => PRDUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const PRDScalarWhereInputSchema: z.ZodType<Prisma.PRDScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PRDScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PRDScalarWhereInputSchema),z.lazy(() => PRDScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  techStack: z.lazy(() => StringNullableListFilterSchema).optional(),
  status: z.union([ z.lazy(() => EnumPrdStatusFilterSchema),z.lazy(() => PrdStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastEditedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pageCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateWithoutPrdsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPrdsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPrdsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPrdsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]),
}).strict();

export const VersionCreateWithoutPrdInputSchema: z.ZodType<Prisma.VersionCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const VersionUncheckedCreateWithoutPrdInputSchema: z.ZodType<Prisma.VersionUncheckedCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const VersionCreateOrConnectWithoutPrdInputSchema: z.ZodType<Prisma.VersionCreateOrConnectWithoutPrdInput> = z.object({
  where: z.lazy(() => VersionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const VersionCreateManyPrdInputEnvelopeSchema: z.ZodType<Prisma.VersionCreateManyPrdInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VersionCreateManyPrdInputSchema),z.lazy(() => VersionCreateManyPrdInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutPrdInputSchema: z.ZodType<Prisma.CommentCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema)
}).strict();

export const CommentUncheckedCreateWithoutPrdInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string()
}).strict();

export const CommentCreateOrConnectWithoutPrdInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutPrdInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const CommentCreateManyPrdInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyPrdInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyPrdInputSchema),z.lazy(() => CommentCreateManyPrdInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SectionCreateWithoutPrdInputSchema: z.ZodType<Prisma.SectionCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SectionUncheckedCreateWithoutPrdInputSchema: z.ZodType<Prisma.SectionUncheckedCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SectionCreateOrConnectWithoutPrdInputSchema: z.ZodType<Prisma.SectionCreateOrConnectWithoutPrdInput> = z.object({
  where: z.lazy(() => SectionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const SectionCreateManyPrdInputEnvelopeSchema: z.ZodType<Prisma.SectionCreateManyPrdInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SectionCreateManyPrdInputSchema),z.lazy(() => SectionCreateManyPrdInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DocumentContentCreateWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  markdownContent: z.string(),
  htmlContent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentContentUncheckedCreateWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUncheckedCreateWithoutPrdInput> = z.object({
  id: z.string().cuid().optional(),
  markdownContent: z.string(),
  htmlContent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentContentCreateOrConnectWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentCreateOrConnectWithoutPrdInput> = z.object({
  where: z.lazy(() => DocumentContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const UserUpsertWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPrdsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPrdsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPrdsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPrdsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPrdsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPrdsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPrdsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPrdsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const VersionUpsertWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.VersionUpsertWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => VersionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VersionUpdateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedUpdateWithoutPrdInputSchema) ]),
  create: z.union([ z.lazy(() => VersionCreateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const VersionUpdateWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.VersionUpdateWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => VersionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VersionUpdateWithoutPrdInputSchema),z.lazy(() => VersionUncheckedUpdateWithoutPrdInputSchema) ]),
}).strict();

export const VersionUpdateManyWithWhereWithoutPrdInputSchema: z.ZodType<Prisma.VersionUpdateManyWithWhereWithoutPrdInput> = z.object({
  where: z.lazy(() => VersionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VersionUpdateManyMutationInputSchema),z.lazy(() => VersionUncheckedUpdateManyWithoutPrdInputSchema) ]),
}).strict();

export const VersionScalarWhereInputSchema: z.ZodType<Prisma.VersionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VersionScalarWhereInputSchema),z.lazy(() => VersionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VersionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VersionScalarWhereInputSchema),z.lazy(() => VersionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  versionNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  markdownContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPrdInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutPrdInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutPrdInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutPrdInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutPrdInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutPrdInputSchema) ]),
}).strict();

export const SectionUpsertWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.SectionUpsertWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => SectionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SectionUpdateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedUpdateWithoutPrdInputSchema) ]),
  create: z.union([ z.lazy(() => SectionCreateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedCreateWithoutPrdInputSchema) ]),
}).strict();

export const SectionUpdateWithWhereUniqueWithoutPrdInputSchema: z.ZodType<Prisma.SectionUpdateWithWhereUniqueWithoutPrdInput> = z.object({
  where: z.lazy(() => SectionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SectionUpdateWithoutPrdInputSchema),z.lazy(() => SectionUncheckedUpdateWithoutPrdInputSchema) ]),
}).strict();

export const SectionUpdateManyWithWhereWithoutPrdInputSchema: z.ZodType<Prisma.SectionUpdateManyWithWhereWithoutPrdInput> = z.object({
  where: z.lazy(() => SectionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SectionUpdateManyMutationInputSchema),z.lazy(() => SectionUncheckedUpdateManyWithoutPrdInputSchema) ]),
}).strict();

export const SectionScalarWhereInputSchema: z.ZodType<Prisma.SectionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SectionScalarWhereInputSchema),z.lazy(() => SectionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SectionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SectionScalarWhereInputSchema),z.lazy(() => SectionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  prdId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentContentUpsertWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUpsertWithoutPrdInput> = z.object({
  update: z.union([ z.lazy(() => DocumentContentUpdateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedUpdateWithoutPrdInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentContentCreateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedCreateWithoutPrdInputSchema) ]),
  where: z.lazy(() => DocumentContentWhereInputSchema).optional()
}).strict();

export const DocumentContentUpdateToOneWithWhereWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUpdateToOneWithWhereWithoutPrdInput> = z.object({
  where: z.lazy(() => DocumentContentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentContentUpdateWithoutPrdInputSchema),z.lazy(() => DocumentContentUncheckedUpdateWithoutPrdInputSchema) ]),
}).strict();

export const DocumentContentUpdateWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentContentUncheckedUpdateWithoutPrdInputSchema: z.ZodType<Prisma.DocumentContentUncheckedUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  htmlContent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PRDCreateWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDCreateWithoutCurrentContentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  versions: z.lazy(() => VersionCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutCurrentContentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedCreateNestedManyWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutCurrentContentInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCurrentContentInputSchema) ]),
}).strict();

export const PRDUpsertWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDUpsertWithoutCurrentContentInput> = z.object({
  update: z.union([ z.lazy(() => PRDUpdateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCurrentContentInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCurrentContentInputSchema) ]),
  where: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const PRDUpdateToOneWithWhereWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDUpdateToOneWithWhereWithoutCurrentContentInput> = z.object({
  where: z.lazy(() => PRDWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PRDUpdateWithoutCurrentContentInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCurrentContentInputSchema) ]),
}).strict();

export const PRDUpdateWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDUpdateWithoutCurrentContentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  versions: z.lazy(() => VersionUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutCurrentContentInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutCurrentContentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDCreateWithoutSectionsInputSchema: z.ZodType<Prisma.PRDCreateWithoutSectionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  versions: z.lazy(() => VersionCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutSectionsInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutSectionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutSectionsInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutSectionsInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutSectionsInputSchema) ]),
}).strict();

export const PRDUpsertWithoutSectionsInputSchema: z.ZodType<Prisma.PRDUpsertWithoutSectionsInput> = z.object({
  update: z.union([ z.lazy(() => PRDUpdateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutSectionsInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutSectionsInputSchema) ]),
  where: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const PRDUpdateToOneWithWhereWithoutSectionsInputSchema: z.ZodType<Prisma.PRDUpdateToOneWithWhereWithoutSectionsInput> = z.object({
  where: z.lazy(() => PRDWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PRDUpdateWithoutSectionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutSectionsInputSchema) ]),
}).strict();

export const PRDUpdateWithoutSectionsInputSchema: z.ZodType<Prisma.PRDUpdateWithoutSectionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  versions: z.lazy(() => VersionUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutSectionsInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutSectionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDCreateWithoutVersionsInputSchema: z.ZodType<Prisma.PRDCreateWithoutVersionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutVersionsInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutVersionsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutVersionsInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutVersionsInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutVersionsInputSchema) ]),
}).strict();

export const PRDUpsertWithoutVersionsInputSchema: z.ZodType<Prisma.PRDUpsertWithoutVersionsInput> = z.object({
  update: z.union([ z.lazy(() => PRDUpdateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutVersionsInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutVersionsInputSchema) ]),
  where: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const PRDUpdateToOneWithWhereWithoutVersionsInputSchema: z.ZodType<Prisma.PRDUpdateToOneWithWhereWithoutVersionsInput> = z.object({
  where: z.lazy(() => PRDWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PRDUpdateWithoutVersionsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutVersionsInputSchema) ]),
}).strict();

export const PRDUpdateWithoutVersionsInputSchema: z.ZodType<Prisma.PRDUpdateWithoutVersionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutVersionsInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutVersionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prds: z.lazy(() => PRDUncheckedCreateNestedManyWithoutAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const PRDCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PRDCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPrdsInputSchema),
  versions: z.lazy(() => VersionCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PRDUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional(),
  versions: z.lazy(() => VersionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedCreateNestedManyWithoutPrdInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedCreateNestedOneWithoutPrdInputSchema).optional()
}).strict();

export const PRDCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PRDCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PRDWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PRDCreateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prds: z.lazy(() => PRDUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional()
}).strict();

export const PRDUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PRDUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PRDUpdateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PRDCreateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PRDWhereInputSchema).optional()
}).strict();

export const PRDUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PRDUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PRDWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PRDUpdateWithoutCommentsInputSchema),z.lazy(() => PRDUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PRDUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PRDUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutPrdsNestedInputSchema).optional(),
  versions: z.lazy(() => VersionUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDCreateManyAuthorInputSchema: z.ZodType<Prisma.PRDCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  projectDescription: z.string(),
  techStack: z.union([ z.lazy(() => PRDCreatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.lazy(() => PrdStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lastEditedAt: z.coerce.date().optional(),
  pageCount: z.number().int().optional(),
  isPublic: z.boolean().optional()
}).strict();

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  prdId: z.string()
}).strict();

export const PRDUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  versions: z.lazy(() => VersionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  sections: z.lazy(() => SectionUncheckedUpdateManyWithoutPrdNestedInputSchema).optional(),
  currentContent: z.lazy(() => DocumentContentUncheckedUpdateOneWithoutPrdNestedInputSchema).optional()
}).strict();

export const PRDUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PRDUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  techStack: z.union([ z.lazy(() => PRDUpdatetechStackInputSchema),z.string().array() ]).optional(),
  status: z.union([ z.lazy(() => PrdStatusSchema),z.lazy(() => EnumPrdStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastEditedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pageCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  isPublic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prd: z.lazy(() => PRDUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prdId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionCreateManyPrdInputSchema: z.ZodType<Prisma.VersionCreateManyPrdInput> = z.object({
  id: z.string().cuid().optional(),
  versionNumber: z.number().int(),
  content: z.string(),
  markdownContent: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const CommentCreateManyPrdInputSchema: z.ZodType<Prisma.CommentCreateManyPrdInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authorId: z.string()
}).strict();

export const SectionCreateManyPrdInputSchema: z.ZodType<Prisma.SectionCreateManyPrdInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  order: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const VersionUpdateWithoutPrdInputSchema: z.ZodType<Prisma.VersionUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionUncheckedUpdateWithoutPrdInputSchema: z.ZodType<Prisma.VersionUncheckedUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VersionUncheckedUpdateManyWithoutPrdInputSchema: z.ZodType<Prisma.VersionUncheckedUpdateManyWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  versionNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  markdownContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutPrdInputSchema: z.ZodType<Prisma.CommentUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutPrdInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutPrdInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionUpdateWithoutPrdInputSchema: z.ZodType<Prisma.SectionUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionUncheckedUpdateWithoutPrdInputSchema: z.ZodType<Prisma.SectionUncheckedUpdateWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SectionUncheckedUpdateManyWithoutPrdInputSchema: z.ZodType<Prisma.SectionUncheckedUpdateManyWithoutPrdInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const PRDFindFirstArgsSchema: z.ZodType<Prisma.PRDFindFirstArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PRDFindFirstOrThrowArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDFindManyArgsSchema: z.ZodType<Prisma.PRDFindManyArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PRDScalarFieldEnumSchema,PRDScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PRDAggregateArgsSchema: z.ZodType<Prisma.PRDAggregateArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithRelationInputSchema.array(),PRDOrderByWithRelationInputSchema ]).optional(),
  cursor: PRDWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PRDGroupByArgsSchema: z.ZodType<Prisma.PRDGroupByArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
  orderBy: z.union([ PRDOrderByWithAggregationInputSchema.array(),PRDOrderByWithAggregationInputSchema ]).optional(),
  by: PRDScalarFieldEnumSchema.array(),
  having: PRDScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PRDFindUniqueArgsSchema: z.ZodType<Prisma.PRDFindUniqueArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PRDFindUniqueOrThrowArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const DocumentContentFindFirstArgsSchema: z.ZodType<Prisma.DocumentContentFindFirstArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentContentOrderByWithRelationInputSchema.array(),DocumentContentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentContentScalarFieldEnumSchema,DocumentContentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentContentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentContentFindFirstOrThrowArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentContentOrderByWithRelationInputSchema.array(),DocumentContentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentContentScalarFieldEnumSchema,DocumentContentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentContentFindManyArgsSchema: z.ZodType<Prisma.DocumentContentFindManyArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentContentOrderByWithRelationInputSchema.array(),DocumentContentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentContentScalarFieldEnumSchema,DocumentContentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentContentAggregateArgsSchema: z.ZodType<Prisma.DocumentContentAggregateArgs> = z.object({
  where: DocumentContentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentContentOrderByWithRelationInputSchema.array(),DocumentContentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentContentGroupByArgsSchema: z.ZodType<Prisma.DocumentContentGroupByArgs> = z.object({
  where: DocumentContentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentContentOrderByWithAggregationInputSchema.array(),DocumentContentOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentContentScalarFieldEnumSchema.array(),
  having: DocumentContentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentContentFindUniqueArgsSchema: z.ZodType<Prisma.DocumentContentFindUniqueArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereUniqueInputSchema,
}).strict() ;

export const DocumentContentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentContentFindUniqueOrThrowArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereUniqueInputSchema,
}).strict() ;

export const SectionFindFirstArgsSchema: z.ZodType<Prisma.SectionFindFirstArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereInputSchema.optional(),
  orderBy: z.union([ SectionOrderByWithRelationInputSchema.array(),SectionOrderByWithRelationInputSchema ]).optional(),
  cursor: SectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SectionScalarFieldEnumSchema,SectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SectionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SectionFindFirstOrThrowArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereInputSchema.optional(),
  orderBy: z.union([ SectionOrderByWithRelationInputSchema.array(),SectionOrderByWithRelationInputSchema ]).optional(),
  cursor: SectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SectionScalarFieldEnumSchema,SectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SectionFindManyArgsSchema: z.ZodType<Prisma.SectionFindManyArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereInputSchema.optional(),
  orderBy: z.union([ SectionOrderByWithRelationInputSchema.array(),SectionOrderByWithRelationInputSchema ]).optional(),
  cursor: SectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SectionScalarFieldEnumSchema,SectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SectionAggregateArgsSchema: z.ZodType<Prisma.SectionAggregateArgs> = z.object({
  where: SectionWhereInputSchema.optional(),
  orderBy: z.union([ SectionOrderByWithRelationInputSchema.array(),SectionOrderByWithRelationInputSchema ]).optional(),
  cursor: SectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SectionGroupByArgsSchema: z.ZodType<Prisma.SectionGroupByArgs> = z.object({
  where: SectionWhereInputSchema.optional(),
  orderBy: z.union([ SectionOrderByWithAggregationInputSchema.array(),SectionOrderByWithAggregationInputSchema ]).optional(),
  by: SectionScalarFieldEnumSchema.array(),
  having: SectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SectionFindUniqueArgsSchema: z.ZodType<Prisma.SectionFindUniqueArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereUniqueInputSchema,
}).strict() ;

export const SectionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SectionFindUniqueOrThrowArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereUniqueInputSchema,
}).strict() ;

export const VersionFindFirstArgsSchema: z.ZodType<Prisma.VersionFindFirstArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereInputSchema.optional(),
  orderBy: z.union([ VersionOrderByWithRelationInputSchema.array(),VersionOrderByWithRelationInputSchema ]).optional(),
  cursor: VersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VersionScalarFieldEnumSchema,VersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VersionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VersionFindFirstOrThrowArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereInputSchema.optional(),
  orderBy: z.union([ VersionOrderByWithRelationInputSchema.array(),VersionOrderByWithRelationInputSchema ]).optional(),
  cursor: VersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VersionScalarFieldEnumSchema,VersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VersionFindManyArgsSchema: z.ZodType<Prisma.VersionFindManyArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereInputSchema.optional(),
  orderBy: z.union([ VersionOrderByWithRelationInputSchema.array(),VersionOrderByWithRelationInputSchema ]).optional(),
  cursor: VersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VersionScalarFieldEnumSchema,VersionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VersionAggregateArgsSchema: z.ZodType<Prisma.VersionAggregateArgs> = z.object({
  where: VersionWhereInputSchema.optional(),
  orderBy: z.union([ VersionOrderByWithRelationInputSchema.array(),VersionOrderByWithRelationInputSchema ]).optional(),
  cursor: VersionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VersionGroupByArgsSchema: z.ZodType<Prisma.VersionGroupByArgs> = z.object({
  where: VersionWhereInputSchema.optional(),
  orderBy: z.union([ VersionOrderByWithAggregationInputSchema.array(),VersionOrderByWithAggregationInputSchema ]).optional(),
  by: VersionScalarFieldEnumSchema.array(),
  having: VersionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VersionFindUniqueArgsSchema: z.ZodType<Prisma.VersionFindUniqueArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereUniqueInputSchema,
}).strict() ;

export const VersionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VersionFindUniqueOrThrowArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereUniqueInputSchema,
}).strict() ;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const PRDCreateArgsSchema: z.ZodType<Prisma.PRDCreateArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  data: z.union([ PRDCreateInputSchema,PRDUncheckedCreateInputSchema ]),
}).strict() ;

export const PRDUpsertArgsSchema: z.ZodType<Prisma.PRDUpsertArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
  create: z.union([ PRDCreateInputSchema,PRDUncheckedCreateInputSchema ]),
  update: z.union([ PRDUpdateInputSchema,PRDUncheckedUpdateInputSchema ]),
}).strict() ;

export const PRDCreateManyArgsSchema: z.ZodType<Prisma.PRDCreateManyArgs> = z.object({
  data: z.union([ PRDCreateManyInputSchema,PRDCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PRDCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PRDCreateManyAndReturnArgs> = z.object({
  data: z.union([ PRDCreateManyInputSchema,PRDCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PRDDeleteArgsSchema: z.ZodType<Prisma.PRDDeleteArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDUpdateArgsSchema: z.ZodType<Prisma.PRDUpdateArgs> = z.object({
  select: PRDSelectSchema.optional(),
  include: PRDIncludeSchema.optional(),
  data: z.union([ PRDUpdateInputSchema,PRDUncheckedUpdateInputSchema ]),
  where: PRDWhereUniqueInputSchema,
}).strict() ;

export const PRDUpdateManyArgsSchema: z.ZodType<Prisma.PRDUpdateManyArgs> = z.object({
  data: z.union([ PRDUpdateManyMutationInputSchema,PRDUncheckedUpdateManyInputSchema ]),
  where: PRDWhereInputSchema.optional(),
}).strict() ;

export const PRDDeleteManyArgsSchema: z.ZodType<Prisma.PRDDeleteManyArgs> = z.object({
  where: PRDWhereInputSchema.optional(),
}).strict() ;

export const DocumentContentCreateArgsSchema: z.ZodType<Prisma.DocumentContentCreateArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  data: z.union([ DocumentContentCreateInputSchema,DocumentContentUncheckedCreateInputSchema ]),
}).strict() ;

export const DocumentContentUpsertArgsSchema: z.ZodType<Prisma.DocumentContentUpsertArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereUniqueInputSchema,
  create: z.union([ DocumentContentCreateInputSchema,DocumentContentUncheckedCreateInputSchema ]),
  update: z.union([ DocumentContentUpdateInputSchema,DocumentContentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DocumentContentCreateManyArgsSchema: z.ZodType<Prisma.DocumentContentCreateManyArgs> = z.object({
  data: z.union([ DocumentContentCreateManyInputSchema,DocumentContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentContentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DocumentContentCreateManyAndReturnArgs> = z.object({
  data: z.union([ DocumentContentCreateManyInputSchema,DocumentContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentContentDeleteArgsSchema: z.ZodType<Prisma.DocumentContentDeleteArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  where: DocumentContentWhereUniqueInputSchema,
}).strict() ;

export const DocumentContentUpdateArgsSchema: z.ZodType<Prisma.DocumentContentUpdateArgs> = z.object({
  select: DocumentContentSelectSchema.optional(),
  include: DocumentContentIncludeSchema.optional(),
  data: z.union([ DocumentContentUpdateInputSchema,DocumentContentUncheckedUpdateInputSchema ]),
  where: DocumentContentWhereUniqueInputSchema,
}).strict() ;

export const DocumentContentUpdateManyArgsSchema: z.ZodType<Prisma.DocumentContentUpdateManyArgs> = z.object({
  data: z.union([ DocumentContentUpdateManyMutationInputSchema,DocumentContentUncheckedUpdateManyInputSchema ]),
  where: DocumentContentWhereInputSchema.optional(),
}).strict() ;

export const DocumentContentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentContentDeleteManyArgs> = z.object({
  where: DocumentContentWhereInputSchema.optional(),
}).strict() ;

export const SectionCreateArgsSchema: z.ZodType<Prisma.SectionCreateArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  data: z.union([ SectionCreateInputSchema,SectionUncheckedCreateInputSchema ]),
}).strict() ;

export const SectionUpsertArgsSchema: z.ZodType<Prisma.SectionUpsertArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereUniqueInputSchema,
  create: z.union([ SectionCreateInputSchema,SectionUncheckedCreateInputSchema ]),
  update: z.union([ SectionUpdateInputSchema,SectionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SectionCreateManyArgsSchema: z.ZodType<Prisma.SectionCreateManyArgs> = z.object({
  data: z.union([ SectionCreateManyInputSchema,SectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SectionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SectionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SectionCreateManyInputSchema,SectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SectionDeleteArgsSchema: z.ZodType<Prisma.SectionDeleteArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  where: SectionWhereUniqueInputSchema,
}).strict() ;

export const SectionUpdateArgsSchema: z.ZodType<Prisma.SectionUpdateArgs> = z.object({
  select: SectionSelectSchema.optional(),
  include: SectionIncludeSchema.optional(),
  data: z.union([ SectionUpdateInputSchema,SectionUncheckedUpdateInputSchema ]),
  where: SectionWhereUniqueInputSchema,
}).strict() ;

export const SectionUpdateManyArgsSchema: z.ZodType<Prisma.SectionUpdateManyArgs> = z.object({
  data: z.union([ SectionUpdateManyMutationInputSchema,SectionUncheckedUpdateManyInputSchema ]),
  where: SectionWhereInputSchema.optional(),
}).strict() ;

export const SectionDeleteManyArgsSchema: z.ZodType<Prisma.SectionDeleteManyArgs> = z.object({
  where: SectionWhereInputSchema.optional(),
}).strict() ;

export const VersionCreateArgsSchema: z.ZodType<Prisma.VersionCreateArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  data: z.union([ VersionCreateInputSchema,VersionUncheckedCreateInputSchema ]),
}).strict() ;

export const VersionUpsertArgsSchema: z.ZodType<Prisma.VersionUpsertArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereUniqueInputSchema,
  create: z.union([ VersionCreateInputSchema,VersionUncheckedCreateInputSchema ]),
  update: z.union([ VersionUpdateInputSchema,VersionUncheckedUpdateInputSchema ]),
}).strict() ;

export const VersionCreateManyArgsSchema: z.ZodType<Prisma.VersionCreateManyArgs> = z.object({
  data: z.union([ VersionCreateManyInputSchema,VersionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VersionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VersionCreateManyAndReturnArgs> = z.object({
  data: z.union([ VersionCreateManyInputSchema,VersionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VersionDeleteArgsSchema: z.ZodType<Prisma.VersionDeleteArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  where: VersionWhereUniqueInputSchema,
}).strict() ;

export const VersionUpdateArgsSchema: z.ZodType<Prisma.VersionUpdateArgs> = z.object({
  select: VersionSelectSchema.optional(),
  include: VersionIncludeSchema.optional(),
  data: z.union([ VersionUpdateInputSchema,VersionUncheckedUpdateInputSchema ]),
  where: VersionWhereUniqueInputSchema,
}).strict() ;

export const VersionUpdateManyArgsSchema: z.ZodType<Prisma.VersionUpdateManyArgs> = z.object({
  data: z.union([ VersionUpdateManyMutationInputSchema,VersionUncheckedUpdateManyInputSchema ]),
  where: VersionWhereInputSchema.optional(),
}).strict() ;

export const VersionDeleteManyArgsSchema: z.ZodType<Prisma.VersionDeleteManyArgs> = z.object({
  where: VersionWhereInputSchema.optional(),
}).strict() ;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() ;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() ;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() ;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() ;