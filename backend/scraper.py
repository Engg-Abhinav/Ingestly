import os
from firecrawl import FirecrawlApp
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Retrieve the Firecrawl API key from environment variables
firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY")

# Initialize the FirecrawlApp using your API key
firecrawl_app = FirecrawlApp(api_key=firecrawl_api_key)

def scrape_content(urls):
    """
    For each URL in the list, use Firecrawl to scrape content in both markdown and HTML formats.
    The scraped content is concatenated into one string.
    """
    all_content = ""
    for url in urls:
        try:
            # Using FirecrawlApp's scrape_url method with the desired formats.
            # Adjust parameters if needed according to Firecrawl's documentation.
            result = firecrawl_app.scrape_url(url, params={"formats": ["markdown", "html"]})
            markdown = result.get("markdown", "")
            html = result.get("html", "")
            all_content += f"URL: {url}\nMarkdown:\n{markdown}\nHTML:\n{html}\n\n"
        except Exception as e:
            print(f"Error scraping {url}: {e}")
    return all_content
