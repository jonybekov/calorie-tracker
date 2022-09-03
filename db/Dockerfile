FROM postgres:latest

ADD /migration/ /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*