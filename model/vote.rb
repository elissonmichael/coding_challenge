require_relative 'application_model'
require_relative 'vote_result'

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

  def results
    @results = VoteResult.all.select { |result| result.vote_id == id }
  end

  def supports
    results.select(&:support?)
  end

  def oppositions
    results.select(&:opposed?)
  end
end
