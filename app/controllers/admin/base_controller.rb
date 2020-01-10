class Admin::BaseController < ApplicationController
  include SessionsHelper
  before_action :store_location
  before_action :authenticate_admin!
  layout :set_layout
  authorize_resource

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.js   { render js: "notAuthorized();"}
      format.json { head :forbidden }
      format.html { redirect_to root_path, :alert => exception.message }
    end
  end

  def current_ability
    @current_ability ||= Ability.new(current_admin)
  end

  private
  def authenticate_admin!
    if !sign_in?
      redirect_to admin_sign_in_path
    end if request.path =~ /\/admin/
  end

  def store_location
    session[:return_to] = request.fullpath if request.get? and request.format.html? and request.fullpath !~ /sign_.*|sessions|registrations|passwords|auth/
  end

  def redirect_back_or(default)
    redirect_to(session[:return_to] || default)
    session.delete(:return_to)
  end

  def set_layout
    request.path.include?('sign_in') ? 'admin_sign' : 'admin'
  end
end