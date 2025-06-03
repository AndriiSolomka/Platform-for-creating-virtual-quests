-- CreateTable
CREATE TABLE "email_confirm_token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "email_confirm_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_confirm_token_token_key" ON "email_confirm_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "email_confirm_token_userId_key" ON "email_confirm_token"("userId");

-- AddForeignKey
ALTER TABLE "email_confirm_token" ADD CONSTRAINT "email_confirm_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
