'use strict';

angular.module('gestigris-common').factory('PlageIntervention',
  function (Schema, Moment, Intervention, Conversation, Etablissement) {

    var PlageIntervention = new Schema('plage-intervention');

    PlageIntervention.post('find', function (next) {
      this.date = new Moment(this.date);
      this.etablissement = new Etablissement(this.etablissement);
      next();
    });

    PlageIntervention.prototype.getInterventions = function () {
      return Intervention.findByPlageId(this._id);
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    return PlageIntervention;

  });
