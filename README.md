# ReBac
## Brief Description

**ReBac** is a simple web application for removing backgrounds from images. It is controlled using a simple web interface.

![Picture](/images/picture.png)

> **Note:** ReBac was created as a means to understand Docker and React.

## How To Run It
### The Normal way
The ReBac application is divided into FrontEnd (client folder) and BackEnd (api folder). If you want to run the applications without problems, you must run both FrontEnd and BackEnd independently.

#### BackEnd
The BackEnd application runs on Python. To run BackEnd, go to the **api** folder and run the package installation command (I recommend creating a virtual environment before installing packages):
```bash
pip install -r requirements.txt
```
Then just run the application:
```bash
python app.py
```
The first time you run it, it will download the background removal model. The application runs on port 5000.
> **Note:** The BackEnd application uses mostly the [rembg](https://github.com/danielgatis/rembg) package by [Daniel Gatis](https://github.com/danielgatis)

#### FrontEnd
I use React as FrontEnd (To run FrontEnd you need to have Note.js and npm installed). Go to the **client** folder and install the necessary packages:
```bash
npm install
```
Finally, run the application:
```bash
npm run dev
```
FrontEnd runs on port 3000.
### Using Docker
Docker is the easiest way to run a ReBac application. In the ReBac directory, run this command:
```bash
docker compose up
```
This will create two images: **rebac-api** (running on port 5000) and **rebac-client** (set to port 3000 in compose.yaml but running on port 80 in Docker).

If the build was successful, the application should run at: 
```bash
127.0.0.1:3000
```
To run the application again, just type:
```bash
docker compose up
```