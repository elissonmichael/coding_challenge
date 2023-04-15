require_relative 'application_model'
require_relative 'bill'

class Vote < ApplicationModel
  attr_reader :id, :bill_id

  def self.filename
    'votes'
  end

  def self.all
    read.map { |row| new(row[:id], row[:bill_id]) }
  end

  def initialize(id, bill_id)
    @id = id
    @bill_id = bill_id
  end

  def bill
    Bill.find(bill_id)
  end
end