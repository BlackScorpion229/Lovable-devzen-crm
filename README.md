# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/569a64aa-fd54-4462-a091-9529939f2136

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/569a64aa-fd54-4462-a091-9529939f2136) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/569a64aa-fd54-4462-a091-9529939f2136) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)




======================================================
## 🚀 Host a React/Vite Project on Azure – Step-by-Step Guide

---

### ✅ 1. Edit Locally

* Use **VS Code** or any editor to develop and test your project.
* For React/Vite:

  ```bash
  npm run dev
  ```

---

### ✅ 2. Push to GitHub

**Initialize Git Repository (if not already):**

```bash
git init
git add .
git commit -m "Initial commit"
```

**Push to GitHub:**

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

---

### ✅ 3. Create Azure Resources

#### A. **Azure App Service** (for hosting frontend)

1. Go to Azure Portal → **App Services** → **Create**.
2. Fill in:

   * **Resource Group**: Create or select an existing one.
   * **App Name**: Unique name like `my-vite-app`.
   * **Publish**: Code
   * **Runtime Stack**: `Node.js`
   * **Region**: Nearest to your users.
3. Click **Review + Create** → **Create**.

#### B. **Azure Blob Storage** (for static files/media uploads)

1. Portal → **Storage Accounts** → **Create**.
2. Fill in:

   * **Storage Account Name**
   * **Performance**: Standard
   * **Redundancy**: LRS (Locally Redundant) or as needed.
3. Click **Create**.

#### C. **Azure SQL Database** (for backend data)

1. Portal → **SQL Databases** → **Create**.
2. Fill in:

   * **Database Name**
   * **Server**: Create or select existing.
   * **Compute + Storage**: Choose pricing tier.
3. Click **Create**.

---

### ✅ 4. Deploy

#### 🔁 Option A: **Deploy from GitHub**

1. Go to **App Service** → **Deployment Center**.
2. Source: GitHub → Select repo & branch.
3. Azure builds and deploys your app automatically.

#### 💻 Option B: **Manual Upload**

1. Build locally:

   ```bash
   npm run build
   ```
2. In Portal → App Service → **Deployment Center** → Select **Local Git / FTP**.
3. Upload your `dist/` folder using FTP or Git.

---

### ✅ 5. Configure Environment Variables

1. In **App Service**, go to **Configuration** → **Application Settings**.
2. Add key-value pairs:

   * `DATABASE_URL`: Azure SQL connection string
   * `BLOB_STORAGE_KEY`: Azure Blob access key
   * Any additional env variables for APIs, secrets, etc.

---

### ✅ 6. Final Testing

* Open your app’s **Azure-provided URL** (e.g., `https://my-vite-app.azurewebsites.net`).
* Confirm:

  * Frontend loads correctly
  * API integrations work
  * Blob uploads/downloads function
  * DB connections work end-to-end

---

### 🧩 Optional Add-ons

* **Custom Domain**: Connect your own domain via App Service → Custom Domains.
* **SSL/HTTPS**: Free SSL cert via Azure.
* **CI/CD**: Configure GitHub Actions for automated deploys.
* **Monitoring**: Use Azure Monitor + Application Insights.
