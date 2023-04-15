require_relative 'application_model'
require_relative 'vote'

class VoteResult < ApplicationModel
  attr_reader :id, :legislator_id, :vote_id, :vote_type

  def self.filename
    'vote_results'
  end

  def self.all
    read.map { |row| new(row[:id], row[:legislator_id], row[:vote_id], row[:vote_type]) }
  end

  def initialize(id, legislator_id, vote_id, vote_type)
    @id = id
    @legislator_id = legislator_id
    @vote_id = vote_id
    @vote_type = vote_type
  end

  def vote
    Vote.find(vote_id)
  end
end
