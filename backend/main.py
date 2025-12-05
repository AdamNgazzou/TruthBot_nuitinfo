from app.main import app

# Expose `app` at module level so `uvicorn main:app` can import it.
# When started directly, run the app with uvicorn.
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
