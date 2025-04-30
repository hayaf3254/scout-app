class Api::V1::CompaniesController < ApplicationController

  def login
    company = Company.find_by(user_id: params[:user_id])
    if company && company.password == params[:password]
      render json: { success: true, company_id: company.id }
    else
      render json: { success: false }, status: :unauthorized
    end
  end


  def index
    @companies = Company.all
    render json: @companies
  end

  def show
    @company = Company.find(params[:id])
    render json: @company
  end

  def create
    @company = Company.new(company_params)
    if @company.save
      render json: @company, status: :created
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def update
    @company = Company.find(params[:id])
    if @company.update(company_params)
      render json: @company, status: :ok
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @company = Company.find(params[:id])
    @company.destroy
    head :no_content
  end

  private

  def company_params
    params.require(:company).permit(:user_id, :password, :name, :publish)
  end
end
