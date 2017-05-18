# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "blitz-frontend"
set :repo_url, "https://4e4238c3605170b4d8ed7b4205c698b085019401@github.com/marca-development/blitz-monitoring-frontend.git"

set :branch, 'development'

set :deploy_to, '/home/ubuntu'


set :keep_releases, 5

after 'deploy:symlink:release', 'npm:deploy'
