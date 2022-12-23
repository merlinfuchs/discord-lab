-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL,
    "avatar" TEXT,
    "bot" BOOLEAN,
    "banner" TEXT,
    "accent_color" INTEGER,
    "public_flags" INTEGER,
    "fetched_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordGuild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "splash" TEXT,
    "discovery_splash" TEXT,
    "emojis" JSONB[],
    "features" TEXT[],
    "approximate_member_count" INTEGER,
    "approximate_presence_count" INTEGER,
    "description" TEXT,
    "stickers" JSONB[],
    "instant_invite" TEXT,
    "members" JSONB[],
    "channels" JSONB[],
    "presence_count" INTEGER,
    "fetched_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordGuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordInvite" (
    "code" TEXT NOT NULL,
    "guild" JSONB,
    "channel" JSONB,
    "inviter" JSONB,
    "target_type" INTEGER,
    "target_user" JSONB,
    "target_application" JSONB,
    "approximate_presence_count" INTEGER,
    "approximate_member_count" INTEGER,
    "expires_at" TIMESTAMP(3),
    "guild_scheduled_event" JSONB,
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscordInvite_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "DiscordApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT NOT NULL,
    "bot_public" BOOLEAN NOT NULL,
    "bot_require_code_grant" BOOLEAN NOT NULL,
    "terms_of_service_url" TEXT,
    "privacy_policy_url" TEXT,
    "verify_key" TEXT NOT NULL,
    "primary_sku_id" TEXT,
    "slug" TEXT,
    "flags" INTEGER NOT NULL,
    "tags" TEXT[],
    "custom_install_url" TEXT,
    "role_connections_verification_url" TEXT,
    "fetched_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscordApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordSnowflakes" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "exists" BOOLEAN NOT NULL,

    CONSTRAINT "DiscordSnowflakes_pkey" PRIMARY KEY ("id","type")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
