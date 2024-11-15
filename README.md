# Cloudflare Pages with Contentful

This project is a static site built with [Next.js](https://nextjs.org/) and deployed on [Cloudflare Pages](https://pages.cloudflare.com/). It fetches and displays articles stored in [Contentful](https://www.contentful.com/) during the build process, rendering them as cards on the homepage.

## Features

- **Static Site Generation (SSG)**: Articles are fetched from Contentful at build time.
- **Contentful Integration**: Uses the Contentful npm package to retrieve article content.
- **Responsive Design**: Displays a list of articles as interactive cards.
- **Optimized for Deployment**: Configured for seamless deployment to Cloudflare Pages.

## Prerequisites

Before using this project, ensure you have the following:

- A [Contentful](https://www.contentful.com/) account with a space ID, API key, and a configured content model for articles.
- A [Cloudflare Pages](https://pages.cloudflare.com/) account for deployment.
- Node.js (version 18 or later) installed.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nouvellonsteph/pages-contentful-moswnn.git
cd pages-contentful-moswnn
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env.local file in the root directory with the following variables:

```plaintext
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

Replace your_space_id and your_access_token with your Contentful space ID and API key.

4. `createContentModel` Script

This project includes a utility script, createContentModel, which automates the process of creating the required content model in Contentful for this site.

Ensure you have the necessary Contentful API credentials and have set the **CONTENTFUL_SPACE_ID** and **CONTENTFUL_ACCESS_TOKEN** environment variables as described earlier.

Run the script to create the content model:

```bash
node createContentModel.js
```

The script will create the following content model:

- **Article**: This is the primary content type for storing articles. It includes fields like **title**, **slug**, **description**, and **content**.

Once the script runs successfully, you can start adding articles to Contentful.

## Usage

### Running the Project Locally
Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000]() in your browser to view the site.

### Building for Production
Generate the static files:

```bash
npm run build
```
Serve the production build locally:

```bash
npm start
```

### Deploying to Cloudflare Pages
1. Push the code to your repository.
2. Set up a Cloudflare Pages project connected to your GitHub repository.
3. Configure the build settings:
   * Build command: npm run build
   * Output directory: out
   * Environment variables: Add the same **CONTENTFUL_SPACE_ID** and **CONTENTFUL_ACCESS_TOKEN** variables as in .env.local.
Cloudflare Pages will automatically build and deploy your site.

## Project Structure
* `pages/`: Contains Next.js pages.
* `components/`: Reusable React components.
* `lib/`: Helper functions for Contentful API interactions.
* `styles/`: Global and component-specific CSS.
* `.github/`: Configuration for GitHub workflows (if applicable).

## Contributing
Contributions are welcome! If you find a bug or have an idea for an improvement, feel free to open an issue or submit a pull request.

1. Fork the repository.

2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes and push the branch:

```bash
git commit -m "Add your feature description"
git push origin feature/your-feature-name
```

4. Open a pull request.

## License
This project is licensed under the [MIT License]().