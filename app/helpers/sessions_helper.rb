module SessionsHelper
  def sign_in(admin)
    remember_token = Admin.new_remember_token
    cookies.permanent[:admin_remember_token] = remember_token
    admin.update_attribute(:remember_token, Admin.encrypt(remember_token))
    self.current_admin = admin
  end

  def sign_in?
    !current_admin.nil?
  end

  def current_admin=(admin)
    @current_admin = admin
  end

  def current_admin
    remember_token = Admin.encrypt(cookies[:admin_remember_token])
    @current_admin ||= Admin.find_by(remember_token: remember_token)
  end

  def current_admin?(admin)
    admin == current_admin
  end

  def sign_out
    current_admin.update_attribute(:remember_token, Admin.encrypt(Admin.new_remember_token))
    self.current_admin = nil
    cookies.delete(:admin_remember_token)
  end
end
