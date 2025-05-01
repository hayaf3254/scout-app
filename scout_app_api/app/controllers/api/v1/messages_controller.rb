class Api::V1::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  # GET /api/v1/messages
  def index
    @messages = Message.all
    render json: @messages
  end

  # GET /api/v1/messages/:id
  def show
    render json: @message
  end

  # POST /api/v1/messages
  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/messages/:id
  def update
    if @message.update(message_params)
      render json: @message, status: :ok
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/messages/:id
  def destroy
    @message.destroy
    head :no_content
  end

  private

  def set_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:sender_id, :receiver_id, :content)
  end
end

