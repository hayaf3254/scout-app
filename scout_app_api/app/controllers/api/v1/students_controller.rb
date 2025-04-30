class Api::V1::StudentsController < ApplicationController

  def login
    student = Student.find_by(user_id: params[:user_id])
    if student && student.password == params[:password]
      render json: { success: true, student_id: student.id }
    else
      render json: { success: false }, status: :unauthorized
    end
  end
  

  def index
    @students = Student.all
    render json:@students
  end

  def show
    @student = Student.find(params[:id])
    render json:@student
  end

  def create
    @student = Student.new(student_params)
        if @student.save
            render json:@student, status: :created
        else
          render json:@student.errors,status: :unprocessable_entity
        end
  end

  def update
    @student = Student.find(params[:id])
    if @student.update(student_params)
      render json:@student, status: :ok
    else
        render json: @student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @student = Student.find(params[:id])
    @student.destroy
    head :no_content
  end

  private
  def student_params
    params.require(:student).permit(:user_id, :password, :name)
  end
end
