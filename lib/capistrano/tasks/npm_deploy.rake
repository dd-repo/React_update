namespace :npm do
  desc 'run deploy'
  task :production_deploy do
    on roles(:app) do
      within "#{current_path}" do
        execute :npm, "run deploy:prod"
      end
    end
  end

  task :staging_deploy do
    on roles(:app) do
      within "#{current_path}" do
        execute :npm, "run deploy:staging"
      end
    end
  end

end
