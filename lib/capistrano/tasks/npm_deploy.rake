namespace :npm do
  desc 'run deploy'
  task :deploy do
    on roles(:app) do
      within "#{current_path}" do
        execute :npm, "run deploy:prod"
      end
    end
  end
end
