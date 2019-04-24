# Postgres [Wiki](https://wiki.archlinux.org/index.php/PostgreSQL)

```

# systemctl [enable|start|status] postgresql.service

```

```
sudo -u postgres psql
postgres=# create database mydb;
postgres=# create user myuser with encrypted password 'mypass';
postgres=# grant all privileges on database mydb to myuser;
    
```

#### How to get port?

```
postgres=# SELECT * FROM pg_settings WHERE name='port';
```

# Apache + mod_wsgi [Wiki](https://wiki.archlinux.org/index.php/Apache_HTTP_Server)

```
sudo pacman -S apache mod_wsgi
```

If you want to have more than one host, uncomment the following line in `/etc/httpd/conf/httpd.conf`:

```
Include conf/extra/httpd-vhosts.conf
```

```
# mkdir /etc/httpd/conf/vhosts
```

You could create soft link to `apache.conf` or copy it. Don't forget to make appropriate changes.

```
mv apache/apache.conf /etc/httpd/conf/vhosts/todoapp.dom
```

# Nginx + uWSGI

