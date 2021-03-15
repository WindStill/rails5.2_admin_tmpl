class ApplicationController < ActionController::Base
  before_action :store_location

  private

  def store_location
    session[:return_to] = request.fullpath if request.get? and request.format.html? and request.fullpath !~ /sign_.*|sessions|registrations|passwords|auth/
  end

  def redirect_back_or(default)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end
end
