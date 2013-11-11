class MoviePagesController < ApplicationController
  require "oauth2"
  before_filter :init

  def movies
  end

  def init
    @client =  OAuth2::Client.new('466e0fff918b758022b310ff5e66bfc7',
                                  '3a54bfb987d6d37d1743c4e0160507de',
                                  :site => 'http://cs3213.herokuapp.com/',
                                  :authorize_url => '/oauth/new',
                                  :token_url => '/oauth/token.json')
    if Rails.env.development?
      @redirect_url = "http://localhost:3000/callback"
    end
    
    @target_url = "http://cs3213.herokuapp.com"
  end

  def callback
    if hasCode?
      access_token = @client.auth_code.get_token(params[:code])
      session[:access_token] = access_token.token
    end
    redirect_to "/"
  end

  def userLogin
    redirect_to @client.auth_code.authorize_url(:redirect_uri => @redirect_url)
  end

  def userLogout
    reset_session
    redirect_to "/"
  end

  def getAppInfo
    @app = {
      login_url: "/",
      access_token: session[:access_token] || "",
      target_url: @target_url
    }

    respond_to do |format|
      format.json { render :json => @app}
    end
  end

  def hasCode?
    params[:code]
  end

  def hasAccess?
    session[:access_token]
  end

  helper_method :hasAccess?
end