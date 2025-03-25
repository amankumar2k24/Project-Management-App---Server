# Node.js Deployment

> Steps to deploy a Node.js app to AWS using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt

## 1. Create Free AWS Account
Create free AWS Account at https://aws.amazon.com/

## 2. Create and Lauch an EC2 instance and SSH into machine
I would be creating a t2.medium ubuntu machine for this demo.

# Run this command first
sudo apt-get update

## 3. Install Node and NPM
```
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash        // run this

sudo apt install nodejs

node --version
```

## 4. Clone your project from Github
```
git clone [your-github-link]
git clone https://github.com/amankumar2k24/Project-Management-App---Server.git
```

## 5. Install dependencies and test app
```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

## 6. Setup Firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 7. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default           // run this 
sudo vim /etc/nginx/sites-available/default           //  i prefer to run this
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;
    server_name project-management.publicvm.com www.project-management.publicvm.com

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```

## 8. Add SSL with LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
<!-- sudo certbot --nginx -d project-management.publicvm.com -d www.project-management.publicvm.com -->

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

## 9. To check DNS - helps track how your domain name resolves to an IP address by querying each DNS server in the hierarchy.
dig +trace www.project-management.publicvm.com


<!-------------------------------- More Extra commands ---------------------------------->
## To check SSL working or not
curl -I https://project-management.publicvm.com
<!-- If it returns 200 OK, SSL is working. or If it fails, check the error message and share it here. -->


#### To Run project with PM2 even if your machine is not open==============================
## Connect to your Ubuntu machine (EC2 instance) via SSH
ssh ubuntu@your-server-ip

## Install pm2 globally
npm install -g pm2

## Navigate to your project directory
cd /path/to/your/project

## Start your application using pm2
pm2 start npm --name "inventory-management" -- run dev

## Save the pm2 process so it restarts after reboot
pm2 save

## Enable pm2 to start on boot
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u ubuntu --hp /home/ubuntu


## To run prisma ==========================================================================
# 1. If your EC2 instance has low RAM or CPU, Prisma commands can slow down.
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 2. Try clearing the cache and regenerating Prisma Client:
rm -rf node_modules/.prisma
npx prisma generate

# 3. Your .env file should have the correct DATABASE_URL
DATABASE_URL="postgresql://postgres:Paulpheonix98125@pm-rds.c520o280al61.ap-south-1.rds.amazonaws.com:5432/projectmanagement"
<!-- Make sure there's no ?schema=public at the end, as psql was giving errors for that. -->

# 4. Run this command to install the PostgreSQL client tools:
sudo apt install postgresql-client

# 5. check if psql is installed:
psql --version

# 6. Test database connection 
psql "postgres://USERNAME:PASSWORD@pm-rds.c520o280al61.ap-south-1.rds.amazonaws.com:5432/projectmanagement"

psql "postgresql://postgres:Paulpheonix98125@pm-rds.c520o280al61.ap-south-1.rds.amazonaws.com:5432/projectmanagement"

## Time to run prisma commandss-------------
1. npx prisma generate
2. npx prisma migrate dev --name init
3. npm run seed


## IMPORTANT PASSWORDS
Aws Amplify or RDS banate waqt ek password dala tha; password is:- Paulpheonix98125