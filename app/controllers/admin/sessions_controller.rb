class Admin::SessionsController < Admin::BaseController
  skip_before_action :authenticate_admin!, except: [:destroy]
  skip_authorize_resource

  def new
    sign_out if sign_in?
  end

  def create
    admin = Admin.find_by(username: params[:session][:username].downcase)
    if admin && admin.authenticate(params[:session][:password])
      sign_in admin
      flash[:success] = '登录成功，欢迎回来'
      redirect_back_or admin_root_path
    else
      flash[:error] = '用户名或密码不正确!'
      redirect_to admin_sign_in_path
    end
  end

  def destroy
    sign_out
    redirect_to admin_sign_in_path
  end
end
